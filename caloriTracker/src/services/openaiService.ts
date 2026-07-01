import { getAuth } from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { app } from '../firebaseConfig';

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  servingSize: string;
}

interface FoodAnalysisResult {
  foodName: string;
  confidence: number;
  description: string;
  nutrition: NutritionData;
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

class OpenAIService {
  private functions = getFunctions(app);
  private auth = getAuth(app);

  constructor() {
    // Connect to Functions emulator in development
    if (__DEV__) {
      try {
        connectFunctionsEmulator(this.functions, 'localhost', 5001);
      } catch (error) {
        // Already connected
      }
    }
  }

  /**
   * Mock food analysis - returns realistic test data
   */
  async analyzeFoodImage(imageUri: string): Promise<FoodAnalysisResult> {
    try {
      console.log('🤖 Mock AI Analysis - Analyzing image:', imageUri);
      
      // Simulate network delay
      await this.delay(2000 + Math.random() * 2000);

      // Generate mock data based on common foods
      const mockFoods = [
        {
          foodName: "Peynirli Tost",
          description: "Kaşar peyniri ve tereyağı ile yapılmış altın renkli tost",
          nutrition: { calories: 320, protein: 15, carbs: 28, fat: 18, fiber: 2, sugar: 3, sodium: 580, servingSize: "1 adet tost" },
          tags: ["kahvaltı", "tost", "peynir", "ekmek"],
          portion: { estimated: "1 porsiyon tost", weight: 120 },
          analysis: {
            freshness: "Taze ve sıcak",
            ingredients: ["Tost ekmeği", "Kaşar peyniri", "Tereyağı"],
            cookingMethod: "Tost makinesi",
            healthScore: 6
          }
        },
        {
          foodName: "Tavuk Döner",
          description: "Lavaş içinde tavuk döner, salata ve sos ile",
          nutrition: { calories: 450, protein: 35, carbs: 32, fat: 22, fiber: 4, sugar: 5, sodium: 920, servingSize: "1 porsiyon" },
          tags: ["öğle yemeği", "tavuk", "döner", "lavaş"],
          portion: { estimated: "1 porsiyon döner", weight: 250 },
          analysis: {
            freshness: "Taze hazırlanmış",
            ingredients: ["Tavuk döner", "Lavaş", "Salata", "Sos"],
            cookingMethod: "Döner şişte",
            healthScore: 7
          }
        },
        {
          foodName: "Makarna",
          description: "Domates soslu spagetti makarna parmesan peyniri ile",
          nutrition: { calories: 380, protein: 16, carbs: 58, fat: 12, fiber: 3, sugar: 8, sodium: 650, servingSize: "1 tabak" },
          tags: ["makarna", "spagetti", "domates", "parmesan"],
          portion: { estimated: "1 tabak makarna", weight: 300 },
          analysis: {
            freshness: "Sıcak servis",
            ingredients: ["Spagetti", "Domates sosu", "Parmesan peyniri"],
            cookingMethod: "Haşlama ve sote",
            healthScore: 6
          }
        },
        {
          foodName: "Elma",
          description: "Taze kırmızı elma, vitaminlerle dolu",
          nutrition: { calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4, sugar: 19, sodium: 2, servingSize: "1 orta boy elma" },
          tags: ["meyve", "elma", "sağlıklı", "atıştırma"],
          portion: { estimated: "1 orta boy elma", weight: 180 },
          analysis: {
            freshness: "Çok taze",
            ingredients: ["Kırmızı elma"],
            cookingMethod: "Çiğ",
            healthScore: 9
          }
        },
        {
          foodName: "Pizza Margherita",
          description: "Domates sosu, mozzarella ve fesleğen ile klasik İtalyan pizzası",
          nutrition: { calories: 280, protein: 12, carbs: 36, fat: 10, fiber: 2, sugar: 4, sodium: 640, servingSize: "1 dilim" },
          tags: ["pizza", "mozzarella", "domates", "İtalyan"],
          portion: { estimated: "1 dilim pizza", weight: 120 },
          analysis: {
            freshness: "Sıcak fırından",
            ingredients: ["Pizza hamuru", "Domates sosu", "Mozzarella", "Fesleğen"],
            cookingMethod: "Fırın",
            healthScore: 5
          }
        }
      ];

      // Randomly select a mock food
      const selectedFood = mockFoods[Math.floor(Math.random() * mockFoods.length)];
      
      // Add some randomness to calories (±20%)
      const calorieVariation = 0.8 + Math.random() * 0.4;
      selectedFood.nutrition.calories = Math.round(selectedFood.nutrition.calories * calorieVariation);

      const result: FoodAnalysisResult = {
        ...selectedFood,
        confidence: 0.85 + Math.random() * 0.1, // 85-95% confidence
        isFood: true,
      };

      console.log('✅ Mock AI Analysis Complete:', result);
      return result;

    } catch (error) {
      console.error('Error in mock food analysis:', error);
      throw new Error('Mock analiz hatası');
    }
  }

  /**
   * Mock food validation - returns true for most images
   */
  async isFoodImage(imageUri: string): Promise<boolean> {
    try {
      console.log('🔍 Mock Food Validation:', imageUri);
      
      // Simulate quick check
      await this.delay(500 + Math.random() * 500);
      
      // 90% chance it's food (for testing)
      const isFood = Math.random() > 0.1;
      
      console.log('✅ Mock Validation Result:', isFood);
      return isFood;

    } catch (error) {
      console.error('Error in mock food validation:', error);
      return true; // Default to true
    }
  }

  /**
   * Get user's daily nutrition summary
   */
  async getDailyNutritionSummary(date?: string): Promise<{
    date: string;
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    mealsLogged: number;
  }> {
    try {
      console.log('📊 Mock Daily Summary for date:', date);
      
      const targetDate = date || new Date().toISOString().split('T')[0];
      
      // Mock daily data
      const mockSummary = {
        date: targetDate,
        totalCalories: Math.floor(800 + Math.random() * 1200), // 800-2000 calories
        totalProtein: Math.floor(30 + Math.random() * 50), // 30-80g protein
        totalCarbs: Math.floor(100 + Math.random() * 150), // 100-250g carbs
        totalFat: Math.floor(20 + Math.random() * 40), // 20-60g fat
        mealsLogged: Math.floor(1 + Math.random() * 4), // 1-4 meals
      };

      return mockSummary;

    } catch (error) {
      console.error('Error getting mock daily summary:', error);
      throw new Error('Failed to get nutrition summary');
    }
  }

  /**
   * Search food by text description (mock version)
   */
  async searchFoodByText(query: string): Promise<FoodAnalysisResult[]> {
    try {
      console.log('🔍 Mock Food Search:', query);
      
      await this.delay(1000);

      const mockSearchResults = [
        {
          foodName: `${query} (Veritabanı)`,
          confidence: 0.9,
          description: `${query} - yerel veritabanından bulunan sonuç`,
          isFood: true,
          nutrition: {
            calories: 100 + Math.floor(Math.random() * 300),
            protein: Math.floor(Math.random() * 20),
            carbs: Math.floor(Math.random() * 40),
            fat: Math.floor(Math.random() * 15),
            fiber: Math.floor(Math.random() * 8),
            sugar: Math.floor(Math.random() * 20),
            sodium: Math.floor(Math.random() * 500),
            servingSize: '1 porsiyon',
          },
          tags: ['veritabanı', 'arama', query.toLowerCase()],
          portion: {
            estimated: '1 porsiyon',
            weight: 100 + Math.floor(Math.random() * 200),
          },
          analysis: {
            freshness: 'Veritabanı verisi',
            ingredients: ['Bilinmiyor'],
            cookingMethod: 'Bilinmiyor',
            healthScore: 5 + Math.floor(Math.random() * 5),
          },
        },
      ];

      return mockSearchResults;

    } catch (error) {
      console.error('Error in mock food search:', error);
      throw new Error('Failed to search food');
    }
  }

  /**
   * Health check for Firebase Functions
   */
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return {
      status: 'mock_healthy',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Utility function to simulate network delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export default new OpenAIService(); 