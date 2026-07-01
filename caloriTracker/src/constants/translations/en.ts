export const en = {
  // Common
  common: {
    ok: 'OK',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No',
    error: 'Error',
    success: 'Success',
    loading: 'Loading...',
    save: 'Save',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    skip: 'Skip',
    done: 'Done',
    edit: 'Edit',
    delete: 'Delete',
    share: 'Share',
    retry: 'Retry',
    close: 'Close',
  },

  // Welcome Screen
  welcome: {
    title: 'CaloriTracker',
    subtitle: 'Your new home for healthy living',
    heroTitle: 'Make calorie tracking\neasier',
    heroDescription: 'Log your meals in seconds with AI-powered photo analysis. The smartest way to reach your goals.',
    getStarted: 'Get Started',
    signIn: 'Already have an account',
    features: {
      aiAnalysis: {
        title: 'AI Photo Analysis',
        description: 'Take a photo of your food and automatically calculate calories and nutrients',
      },
      smartTracking: {
        title: 'Smart Tracking',
        description: 'View daily, weekly, and monthly progress reports',
      },
      goalFocused: {
        title: 'Goal Focused',
        description: 'Set personalized goals and celebrate your achievements',
      },
    },
    stats: {
      fasterResults: 'Faster Results',
      accuracy: 'Accuracy Rate',
    },
  },

  // Auth Screen
  auth: {
    welcomeBack: 'Welcome Back',
    createAccount: 'Create Account',
    signInSubtitle: 'Sign in to your account and continue where you left off',
    signUpSubtitle: 'Create an account to start your healthy living journey',
    fullName: 'Full Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    orContinueWith: 'or',
    googleSignIn: 'Continue with Google',
    appleSignIn: 'Continue with Apple',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: 'Don\'t have an account?',
    forgotPassword: 'Forgot Password',
    placeholders: {
      fullName: 'Enter your full name',
      email: 'Enter your email address',
      password: 'Enter your password',
      confirmPassword: 'Confirm your password',
    },
    errors: {
      nameRequired: 'Full name is required',
      emailRequired: 'Email is required',
      invalidEmail: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      passwordTooShort: 'Password must be at least 6 characters',
      passwordsDontMatch: 'Passwords don\'t match',
    },
  },

  // Onboarding
  onboarding: {
    step: 'Step',
    of: 'of',
    personalInfo: {
      title: 'Let\'s Get to Know You',
      subtitle: 'Share your basic information for a personalized experience',
      name: 'Full Name',
      dateOfBirth: 'Date of Birth',
      gender: 'Gender',
      height: 'Height (cm)',
      weight: 'Weight (kg)',
      activityLevel: 'Activity Level',
      activitySubtitle: 'Select your daily activity level',
      genders: {
        male: 'Male',
        female: 'Female',
        other: 'Other',
      },
      activities: {
        sedentary: {
          title: 'Sedentary',
          description: 'Desk job, very little activity',
        },
        light: {
          title: 'Lightly Active',
          description: 'Light exercise, 1-3 days per week',
        },
        moderate: {
          title: 'Moderately Active',
          description: 'Moderate exercise, 3-5 days per week',
        },
        active: {
          title: 'Active',
          description: 'Intense exercise, 6-7 days per week',
        },
        veryActive: {
          title: 'Very Active',
          description: 'Twice daily exercise or physical job',
        },
      },
      errors: {
        nameRequired: 'Name is required',
        invalidHeight: 'Height must be between 100-250 cm',
        invalidWeight: 'Weight must be between 30-300 kg',
        invalidAge: 'Age must be between 13-100',
      },
    },
    goals: {
      title: 'Set Your Goal',
      subtitle: 'What would you like to focus on?',
      loseWeight: 'Lose Weight',
      maintainWeight: 'Maintain Weight',
      gainWeight: 'Gain Weight',
      currentWeight: 'Current Weight',
      goalWeight: 'Goal Weight',
      weeklyGoal: 'Weekly Goal',
      perWeek: '/week',
    },
    preferences: {
      title: 'Set Your Preferences',
      subtitle: 'Customize your app experience',
      units: 'Units',
      metric: 'Metric (kg, cm)',
      imperial: 'Imperial (lb, ft)',
      notifications: 'Notifications',
      notificationsDesc: 'Meal reminders and motivational messages',
      privacy: 'Privacy',
      privacyDesc: 'Who can see your profile and progress',
      privacyOptions: {
        public: 'Public',
        friends: 'Friends Only',
        private: 'Private',
      },
    },
  },

  // Main App
  navigation: {
    home: 'Home',
    progress: 'Progress',
    settings: 'Settings',
    profile: 'Profile',
  },

  // Home Screen
  home: {
    greeting: 'Hello',
    todaysProgress: 'Today\'s Progress',
    caloriesLeft: 'Calories Left',
    caloriesConsumed: 'Calories Consumed',
    caloriesBurned: 'Calories Burned',
    macros: {
      protein: 'Protein',
      carbs: 'Carbs',
      fat: 'Fat',
      fiber: 'Fiber',
    },
    quickActions: {
      title: 'Quick Actions',
      addMeal: 'Add Meal',
      addExercise: 'Add Exercise',
      logWeight: 'Log Weight',
      addWater: 'Add Water',
    },
    recentMeals: 'Recent Meals',
    noMealsToday: 'No meals logged today',
    addFirstMeal: 'Add your first meal',
  },

  // Food Logging
  food: {
    addFood: 'Add Food',
    takePhoto: 'Take Photo',
    searchFood: 'Search Food',
    manualEntry: 'Manual Entry',
    analyzing: 'Analyzing Photo...',
    analysisComplete: 'Analysis Complete',
    confirmFood: 'Confirm Food',
    editFood: 'Edit Food',
    quantity: 'Quantity',
    servingSize: 'Serving Size',
    nutritionFacts: 'Nutrition Facts',
    caloriesPerServing: 'Calories per Serving',
  },

  // Settings
  settings: {
    title: 'Settings',
    account: 'Account',
    notifications: 'Notifications',
    units: 'Units',
    privacy: 'Privacy',
    about: 'About',
    help: 'Help',
    signOut: 'Sign Out',
    version: 'Version',
    language: 'Language',
    darkMode: 'Dark Mode',
    dataExport: 'Export Data',
    deleteAccount: 'Delete Account',
  },

  // Errors
  errors: {
    networkError: 'Network connection error',
    serverError: 'Server error',
    unknownError: 'Unknown error',
    photoAnalysisFailed: 'Photo analysis failed',
    pleaseCompleteForm: 'Please complete all fields correctly',
    googleSignInCancelled: 'Google sign-in was cancelled',
    appleSignInUnavailable: 'Apple sign-in is not available',
  },

  // Success Messages
  success: {
    profileUpdated: 'Profile updated',
    mealAdded: 'Meal added',
    weightLogged: 'Weight logged',
    goalAchieved: 'Goal achieved!',
    dataExported: 'Data exported',
  },

  // Health
  health: {
    connect: 'Connect to Apple Health',
    connecting: 'Connecting...',
    notNow: 'Not Now',
    skip: 'Skip',
    title: 'Smarter Tracking with Apple Health',
    subtitle: 'Automatically sync your health data and get more accurate calorie calculations.',
    permissionsTitle: 'What Data Do We Want to Access?',
    benefitsTitle: 'Benefits',
    privacyTitle: '🔒 Privacy & Security',
    privacyText: 'Your data is processed only on your device. Apple Health data is never sent to our servers. You have full control!',
    dataTypes: {
      steps: 'Step Count',
      activeEnergy: 'Calories Burned',
      heartRate: 'Heart Rate',
      sleep: 'Sleep Data',
      bodyMass: 'Weight Tracking',
      height: 'Height Information',
      workouts: 'Workout Data',
    },
    descriptions: {
      steps: 'Track daily step activities',
      activeEnergy: 'Calculate calories burned during activities',
      heartRate: 'Better analyze your health status',
      sleep: 'View sleep quality and duration',
      bodyMass: 'Track progress towards your goals',
      height: 'For more accurate calorie calculations',
      workouts: 'Workout history and performance',
    },
    benefits: {
      accuracy: 'More accurate calorie and activity calculations',
      sync: 'Automatic data synchronization - no manual entry required',
      insights: 'Comprehensive health analysis and personalized recommendations',
    },
    support: {
      title: 'Would You Like to Support Us?',
      subtitle: 'If you like our app, you can help us reach other users by giving us 5 stars on the App Store! ⭐️',
      yes: 'Yes, Rate Us! ⭐️',
      no: 'Not Now',
    },
    errors: {
      iosOnly: 'Apple Health is only available on iOS devices.',
      permissionDenied: 'Apple Health permissions were denied. You can enable them later in settings.',
      connectionFailed: 'A problem occurred while connecting to Apple Health. You can enable it later in settings.',
    },
  },
}; 