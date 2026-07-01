import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { OnboardingData, PersonalizedPlan } from '../types/onboarding';

interface OnboardingContextType {
  data: OnboardingData;
  personalizedPlan: PersonalizedPlan | null;
  updatePersonalInfo: (info: Partial<OnboardingData['personalInfo']>) => void;
  updateGoals: (goals: Partial<OnboardingData['goals']>) => void;
  updateActivityLevel: (activity: Partial<OnboardingData['activityLevel']>) => void;
  updateFoodPreferences: (prefs: Partial<OnboardingData['foodPreferences']>) => void;
  updateHealthData: (health: Partial<OnboardingData['healthData']>) => void;
  updateAppPreferences: (prefs: Partial<OnboardingData['appPreferences']>) => void;
  completeStep: (stepId: string) => void;
  goToStep: (step: number) => void;
  generatePersonalizedPlan: () => PersonalizedPlan;
  isOnboardingComplete: () => boolean;
  resetOnboarding: () => void;
}

const STORAGE_KEY = 'onboarding_data';
const TOTAL_STEPS = 15;

const initialOnboardingData: OnboardingData = {
  personalInfo: {},
  goals: {},
  activityLevel: {},
  foodPreferences: {},
  healthData: {},
  appPreferences: {
    notifications: {
      mealReminders: true,
      waterReminders: true,
      workoutReminders: true,
      progressUpdates: true,
      preferredTime: '09:00',
    },
    appleHealthSync: false,
    weeklyReports: true,
    language: 'tr',
  },
  completedSteps: [],
  currentStep: 1,
  totalSteps: TOTAL_STEPS,
  startedAt: new Date().toISOString(),
};

type OnboardingAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<OnboardingData['personalInfo']> }
  | { type: 'UPDATE_GOALS'; payload: Partial<OnboardingData['goals']> }
  | { type: 'UPDATE_ACTIVITY_LEVEL'; payload: Partial<OnboardingData['activityLevel']> }
  | { type: 'UPDATE_FOOD_PREFERENCES'; payload: Partial<OnboardingData['foodPreferences']> }
  | { type: 'UPDATE_HEALTH_DATA'; payload: Partial<OnboardingData['healthData']> }
  | { type: 'UPDATE_APP_PREFERENCES'; payload: Partial<OnboardingData['appPreferences']> }
  | { type: 'COMPLETE_STEP'; payload: string }
  | { type: 'GO_TO_STEP'; payload: number }
  | { type: 'LOAD_DATA'; payload: OnboardingData }
  | { type: 'RESET_ONBOARDING' };

function onboardingReducer(state: OnboardingData, action: OnboardingAction): OnboardingData {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };
    case 'UPDATE_GOALS':
      return {
        ...state,
        goals: { ...state.goals, ...action.payload },
      };
    case 'UPDATE_ACTIVITY_LEVEL':
      return {
        ...state,
        activityLevel: { ...state.activityLevel, ...action.payload },
      };
    case 'UPDATE_FOOD_PREFERENCES':
      return {
        ...state,
        foodPreferences: { ...state.foodPreferences, ...action.payload },
      };
    case 'UPDATE_HEALTH_DATA':
      return {
        ...state,
        healthData: { ...state.healthData, ...action.payload },
      };
    case 'UPDATE_APP_PREFERENCES':
      return {
        ...state,
        appPreferences: { ...state.appPreferences, ...action.payload },
      };
    case 'COMPLETE_STEP':
      const newCompletedSteps = [...state.completedSteps];
      if (!newCompletedSteps.includes(action.payload)) {
        newCompletedSteps.push(action.payload);
      }
      return {
        ...state,
        completedSteps: newCompletedSteps,
        currentStep: Math.min(state.currentStep + 1, state.totalSteps),
      };
    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'LOAD_DATA':
      return action.payload;
    case 'RESET_ONBOARDING':
      return {
        ...initialOnboardingData,
        startedAt: new Date().toISOString(),
      };
    default:
      return state;
  }
}

// BMR Calculation (Mifflin-St Jeor Equation)
function calculateBMR(weight: number, height: number, age: number, gender: string): number {
  const baseCalc = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? baseCalc + 5 : baseCalc - 161;
}

// TDEE Calculation
function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9,
  };
  return bmr * (multipliers[activityLevel as keyof typeof multipliers] || 1.2);
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(onboardingReducer, initialOnboardingData);
  const [personalizedPlan, setPersonalizedPlan] = React.useState<PersonalizedPlan | null>(null);

  // Load data from storage on mount
  useEffect(() => {
    loadOnboardingData();
  }, []);

  // Save data to storage whenever it changes
  useEffect(() => {
    saveOnboardingData(data);
  }, [data]);

  const loadOnboardingData = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      }
    } catch (error) {
      console.error('Error loading onboarding data:', error);
    }
  };

  const saveOnboardingData = async (data: OnboardingData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  };

  const updatePersonalInfo = (info: Partial<OnboardingData['personalInfo']>) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: info });
  };

  const updateGoals = (goals: Partial<OnboardingData['goals']>) => {
    dispatch({ type: 'UPDATE_GOALS', payload: goals });
  };

  const updateActivityLevel = (activity: Partial<OnboardingData['activityLevel']>) => {
    dispatch({ type: 'UPDATE_ACTIVITY_LEVEL', payload: activity });
  };

  const updateFoodPreferences = (prefs: Partial<OnboardingData['foodPreferences']>) => {
    dispatch({ type: 'UPDATE_FOOD_PREFERENCES', payload: prefs });
  };

  const updateHealthData = (health: Partial<OnboardingData['healthData']>) => {
    dispatch({ type: 'UPDATE_HEALTH_DATA', payload: health });
  };

  const updateAppPreferences = (prefs: Partial<OnboardingData['appPreferences']>) => {
    dispatch({ type: 'UPDATE_APP_PREFERENCES', payload: prefs });
  };

  const completeStep = (stepId: string) => {
    dispatch({ type: 'COMPLETE_STEP', payload: stepId });
  };

  const goToStep = (step: number) => {
    dispatch({ type: 'GO_TO_STEP', payload: step });
  };

  const generatePersonalizedPlan = (): PersonalizedPlan => {
    const { personalInfo, goals, activityLevel } = data;
    
    if (!personalInfo.age || !personalInfo.height || !personalInfo.currentWeight || !personalInfo.gender) {
      throw new Error('Missing personal information for plan generation');
    }

    const bmr = calculateBMR(
      personalInfo.currentWeight,
      personalInfo.height,
      personalInfo.age,
      personalInfo.gender
    );

    const tdee = calculateTDEE(bmr, activityLevel.level || 'moderately_active');

    // Calculate calorie goal based on weight goal
    let calorieAdjustment = 0;
    const weightGoal = goals.weeklyWeightGoal || 0.5;
    
    if (goals.primaryGoal === 'lose_weight') {
      calorieAdjustment = -500 * weightGoal; // 500 cal deficit per 0.5kg/week
    } else if (goals.primaryGoal === 'gain_weight') {
      calorieAdjustment = 500 * weightGoal;
    }

    const dailyCalorieGoal = Math.max(1200, tdee + calorieAdjustment); // Minimum 1200 calories

    // Calculate macros (balanced approach)
    const proteinCalories = dailyCalorieGoal * 0.25;
    const carbCalories = dailyCalorieGoal * 0.45;
    const fatCalories = dailyCalorieGoal * 0.30;

    const plan: PersonalizedPlan = {
      dailyCalorieGoal: Math.round(dailyCalorieGoal),
      macroTargets: {
        protein: Math.round(proteinCalories / 4), // 4 cal per gram
        carbs: Math.round(carbCalories / 4),
        fat: Math.round(fatCalories / 9), // 9 cal per gram
      },
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLossRate: weightGoal,
      estimatedTimeToGoal: Math.abs((personalInfo.targetWeight || personalInfo.currentWeight) - personalInfo.currentWeight) / weightGoal,
      recommendedMeals: ['Kahvaltı', 'Öğle Yemeği', 'Akşam Yemeği', 'Atıştırmalık'],
    };

    setPersonalizedPlan(plan);
    return plan;
  };

  const isOnboardingComplete = (): boolean => {
    return data.completedSteps.length >= TOTAL_STEPS * 0.8; // 80% completion
  };

  const resetOnboarding = () => {
    dispatch({ type: 'RESET_ONBOARDING' });
    setPersonalizedPlan(null);
  };

  const value: OnboardingContextType = {
    data,
    personalizedPlan,
    updatePersonalInfo,
    updateGoals,
    updateActivityLevel,
    updateFoodPreferences,
    updateHealthData,
    updateAppPreferences,
    completeStep,
    goToStep,
    generatePersonalizedPlan,
    isOnboardingComplete,
    resetOnboarding,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
} 