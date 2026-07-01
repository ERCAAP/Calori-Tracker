// Types for onboarding flow

export interface PersonalInfo {
  name?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  height?: number; // cm
  currentWeight?: number; // kg
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  age?: number;
}

export interface Goals {
  goalType?: 'lose_weight' | 'maintain_weight' | 'gain_weight';
  targetWeight?: number; // kg
  weeklyWeightGoal?: number; // kg per week
  targetDate?: Date;
  motivation?: string[];
}

export interface ActivityLevel {
  level?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  exerciseFrequency?: number; // days per week
  exerciseTypes?: string[];
  dailySteps?: number;
}

export interface FoodPreferences {
  dietType?: 'omnivore' | 'vegetarian' | 'vegan' | 'keto' | 'paleo' | 'mediterranean';
  allergies?: string[];
  dislikes?: string[];
  cuisinePreferences?: string[];
  mealFrequency?: number; // meals per day
  snackPreferences?: string[];
}

export interface HealthData {
  medicalConditions?: string[];
  medications?: string[];
  bloodType?: string;
  restingHeartRate?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
}

export interface AppPreferences {
  notifications?: {
    mealReminders?: boolean;
    waterReminders?: boolean;
    workoutReminders?: boolean;
    progressUpdates?: boolean;
    preferredTime?: string;
  };
  units?: {
    weight?: 'kg' | 'lbs';
    height?: 'cm' | 'ft';
    temperature?: 'celsius' | 'fahrenheit';
  };
  privacy?: {
    shareProgress?: boolean;
    publicProfile?: boolean;
  };
  appleHealthSync?: boolean;
  weeklyReports?: boolean;
  language?: 'tr' | 'en';
}

export interface OnboardingData {
  personalInfo: Partial<PersonalInfo>;
  goals: Partial<Goals>;
  activityLevel: Partial<ActivityLevel>;
  foodPreferences: Partial<FoodPreferences>;
  healthData: Partial<HealthData>;
  appPreferences: Partial<AppPreferences>;
  completedSteps: string[];
  currentStep: number;
  totalSteps: number;
  startedAt: string;
  completedAt?: string;
}

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle?: string;
  component: string;
  required: boolean;
  order: number;
}

export interface PersonalizedPlan {
  dailyCalorieGoal: number;
  macroTargets: {
    protein: number; // grams
    carbs: number; // grams  
    fat: number; // grams
  };
  bmr: number; // Basal Metabolic Rate
  tdee: number; // Total Daily Energy Expenditure
  weightLossRate: number; // kg per week
  estimatedTimeToGoal: number; // weeks
  recommendedMeals: string[];
} 