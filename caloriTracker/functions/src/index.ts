/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as admin from "firebase-admin";
import { HttpsError, onCall, onRequest } from "firebase-functions/v2/https";
import OpenAI from "openai";
import sharp from "sharp";

// Initialize Firebase Admin
admin.initializeApp();

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// Food Analysis Result Interface
interface FoodAnalysisResult {
  foodName: string;
  confidence: number;
  description: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
    servingSize: string;
  };
  tags: string[];
  isFood: boolean;
  portion: {
    estimated: string;
    weight: number; // in grams
  };
  analysis: {
    freshness: string;
    ingredients: string[];
    cookingMethod: string;
    healthScore: number; // 1-10
  };
}

/**
 * Analyze food image using OpenAI GPT-4 Omni Vision API
 */
export const analyzeFoodImage = onCall(
  {
    cors: true,
    maxInstances: 10,
  },
  async (request) => {
    try {
      const { imageBase64, userId } = request.data;

      if (!imageBase64) {
        throw new HttpsError("invalid-argument", "Image data is required");
      }

      if (!userId) {
        throw new HttpsError("unauthenticated", "User must be authenticated");
      }

      // Validate and optimize image
      const processedImage = await processImage(imageBase64);

      // Call OpenAI GPT-4 Omni Vision API
      const analysisResult = await analyzeWithGPT4Omni(processedImage);

      // Save analysis to Firestore
      await saveAnalysisToFirestore(userId, analysisResult, imageBase64);

      return {
        success: true,
        data: analysisResult,
        timestamp: admin.firestore.Timestamp.now(),
      };

    } catch (error) {
      console.error("Error analyzing food image:", error);
      
      if (error instanceof HttpsError) {
        throw error;
      }

      throw new HttpsError(
        "internal",
        "Failed to analyze food image",
        { originalError: error instanceof Error ? error.message : "Unknown error" }
      );
    }
  }
);

/**
 * Process and optimize image for AI analysis
 */
async function processImage(imageBase64: string): Promise<string> {
  try {
    // Remove data:image/jpeg;base64, prefix if present
    const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");
    
    // Convert base64 to buffer
    const imageBuffer = Buffer.from(base64Data, "base64");

    // Optimize image using Sharp
    const processedBuffer = await sharp(imageBuffer)
      .resize(1024, 1024, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();

    // Convert back to base64
    return processedBuffer.toString("base64");

  } catch (error) {
    console.error("Error processing image:", error);
    throw new HttpsError("invalid-argument", "Invalid image format");
  }
}

/**
 * Analyze food using OpenAI GPT-4 Omni Vision API
 */
async function analyzeWithGPT4Omni(imageBase64: string): Promise<FoodAnalysisResult> {
  try {
    const prompt = `
Analyze this food image in detail and provide comprehensive nutritional information in Turkish.

Please respond with a JSON object containing:
{
  "foodName": "specific name of the food/dish in Turkish",
  "confidence": "confidence level 0-1 (decimal)",
  "description": "detailed description of the food in Turkish",
  "isFood": "true if this is actually food, false otherwise",
  "nutrition": {
    "calories": "estimated calories per serving (number)",
    "protein": "protein in grams (number)",
    "carbs": "carbohydrates in grams (number)", 
    "fat": "fat in grams (number)",
    "fiber": "fiber in grams (number)",
    "sugar": "sugar in grams (number)",
    "sodium": "sodium in mg (number)",
    "servingSize": "description of serving size in Turkish"
  },
  "tags": ["array", "of", "relevant", "Turkish", "food", "tags"],
  "portion": {
    "estimated": "estimated portion description in Turkish",
    "weight": "estimated weight in grams (number)"
  },
  "analysis": {
    "freshness": "freshness assessment in Turkish (fresh/stale/etc)",
    "ingredients": ["list", "of", "visible", "ingredients", "in", "Turkish"],
    "cookingMethod": "cooking method in Turkish (grilled/fried/boiled/etc)",
    "healthScore": "health score 1-10 (number, 10 being healthiest)"
  }
}

Important guidelines:
- If this is not food, set isFood to false and provide minimal data
- Be as accurate as possible with nutritional estimates
- Consider typical Turkish serving sizes
- Provide realistic portion estimates
- Rate healthiness based on cooking method, ingredients, and nutritional value
- Use Turkish language for all text fields
- Ensure all numbers are actual numbers, not strings
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // GPT-4 Omni model
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
                detail: "high" // High detail for better food analysis
              },
            },
          ],
        },
      ],
      max_tokens: 1500,
      temperature: 0.1, // Low temperature for consistent results
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content received from OpenAI API");
    }

    // Parse JSON response
    try {
      const result = JSON.parse(content) as FoodAnalysisResult;
      
      // Validate required fields
      if (!result.foodName || typeof result.confidence !== "number") {
        throw new Error("Invalid response format from OpenAI API");
      }

      return result;

    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", content);
      throw new Error("Invalid JSON response from OpenAI API");
    }

  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new HttpsError("internal", "OpenAI API call failed");
  }
}

/**
 * Save analysis result to Firestore
 */
async function saveAnalysisToFirestore(
  userId: string, 
  analysis: FoodAnalysisResult, 
  imageBase64: string
): Promise<void> {
  try {
    const db = admin.firestore();
    
    // Save to user's food diary
    await db.collection("users").doc(userId).collection("foodDiary").add({
      ...analysis,
      imageUrl: `data:image/jpeg;base64,${imageBase64.substring(0, 100)}...`, // Store thumbnail
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      source: "ai_analysis",
      verified: false, // User can verify/edit the analysis
    });

    // Update user's daily stats
    const today = new Date().toISOString().split("T")[0];
    const dailyStatsRef = db
      .collection("users")
      .doc(userId)
      .collection("dailyStats")
      .doc(today);

    await db.runTransaction(async (transaction) => {
      const dailyStatsDoc = await transaction.get(dailyStatsRef);
      
      if (dailyStatsDoc.exists) {
        const currentStats = dailyStatsDoc.data();
        transaction.update(dailyStatsRef, {
          totalCalories: (currentStats?.totalCalories || 0) + analysis.nutrition.calories,
          totalProtein: (currentStats?.totalProtein || 0) + analysis.nutrition.protein,
          totalCarbs: (currentStats?.totalCarbs || 0) + analysis.nutrition.carbs,
          totalFat: (currentStats?.totalFat || 0) + analysis.nutrition.fat,
          mealsLogged: (currentStats?.mealsLogged || 0) + 1,
          lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        });
      } else {
        transaction.set(dailyStatsRef, {
          date: today,
          totalCalories: analysis.nutrition.calories,
          totalProtein: analysis.nutrition.protein,
          totalCarbs: analysis.nutrition.carbs,
          totalFat: analysis.nutrition.fat,
          mealsLogged: 1,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    });

  } catch (error) {
    console.error("Error saving to Firestore:", error);
    // Don't throw error here, as analysis was successful
  }
}

/**
 * Quick food validation - check if image contains food
 */
export const validateFoodImage = onCall(
  {
    cors: true,
    maxInstances: 10,
  },
  async (request) => {
    try {
      const { imageBase64 } = request.data;

      if (!imageBase64) {
        throw new HttpsError("invalid-argument", "Image data is required");
      }

      const processedImage = await processImage(imageBase64);

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Look at this image and determine if it contains food or a meal. Respond with only 'true' if it's food, or 'false' if it's not food. Consider drinks as food as well.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${processedImage}`,
                  detail: "low" // Low detail for quick validation
                },
              },
            ],
          },
        ],
        max_tokens: 10,
        temperature: 0,
      });

      const content = response.choices[0]?.message?.content?.trim().toLowerCase();
      const isFood = content === "true";

      return {
        success: true,
        isFood,
        confidence: isFood ? 0.9 : 0.1,
      };

    } catch (error) {
      console.error("Error validating food image:", error);
      throw new HttpsError("internal", "Failed to validate food image");
    }
  }
);

/**
 * Get user's daily nutrition summary
 */
export const getDailyNutritionSummary = onCall(
  {
    cors: true,
  },
  async (request) => {
    try {
      const { userId, date } = request.data;

      if (!userId) {
        throw new HttpsError("unauthenticated", "User must be authenticated");
      }

      const targetDate = date || new Date().toISOString().split("T")[0];
      const db = admin.firestore();

      const dailyStatsDoc = await db
        .collection("users")
        .doc(userId)
        .collection("dailyStats")
        .doc(targetDate)
        .get();

      if (!dailyStatsDoc.exists) {
        return {
          success: true,
          data: {
            date: targetDate,
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFat: 0,
            mealsLogged: 0,
          },
        };
      }

      return {
        success: true,
        data: dailyStatsDoc.data(),
      };

    } catch (error) {
      console.error("Error getting daily nutrition summary:", error);
      throw new HttpsError("internal", "Failed to get nutrition summary");
    }
  }
);

/**
 * Health check endpoint
 */
export const healthCheck = onRequest(
  {
    cors: true,
  },
  (req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "calori-tracker-functions",
      version: "1.0.0",
    });
  }
);
