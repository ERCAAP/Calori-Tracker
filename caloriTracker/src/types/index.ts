export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  isAnonymous?: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  height?: number;
  weight?: number;
  activityLevel?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Goals {
  dailyCalories: number;
  macroTargets: {
    protein: number;
    carbs: number;
    fat: number;
  };
  weeklyWeightGoal: number;
  waterIntake: number;
}

export interface Food {
  id: string;
  name: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sugar?: number;
  };
  quantity: number;
  unit: string;
  photoUrl?: string;
  timestamp: string;
  source: 'photo' | 'manual' | 'database';
}

export interface Exercise {
  id: string;
  type: string;
  name: string;
  duration: number;
  caloriesBurned: number;
  timestamp: string;
}

export interface DayEntry {
  date: string;
  foods: Food[];
  exercise: Exercise[];
  water: {
    amount: number;
    unit: 'ml' | 'fl_oz';
  };
  weight?: {
    value: number;
    unit: 'kg' | 'lb';
    timestamp: string;
  };
  totalCalories: number;
  totalMacros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface WeightEntry {
  value: number;
  unit: 'kg' | 'lb';
  date: string;
  timestamp: string;
}

export interface Analytics {
  weeklyAverages: {
    calories: number;
    weight: number;
    exercise: number;
  };
  monthlyTrends: {
    weightChange: number;
    calorieDeficit: number;
    exerciseMinutes: number;
  };
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  type: 'weight' | 'calorie' | 'exercise' | 'streak';
}

export interface OnboardingData {
  step: number;
  profile: Partial<UserProfile>;
  goals: Partial<Goals>;
  completed: boolean;
}

export interface FoodSearchResult {
  id: string;
  name: string;
  brand?: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  servingSize: {
    amount: number;
    unit: string;
  };
}

export interface PhotoAnalysisResult {
  foods: Array<{
    name: string;
    confidence: number;
    calories: number;
    macros: {
      protein: number;
      carbs: number;
      fat: number;
    };
    quantity: {
      amount: number;
      unit: string;
    };
  }>;
  totalCalories: number;
  analysisId: string;
} 