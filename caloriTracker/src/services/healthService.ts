import { Platform } from 'react-native';

// Health data types we want to read
export interface HealthDataTypes {
  steps: boolean;
  activeEnergy: boolean;
  heartRate: boolean;
  sleep: boolean;
  bodyMass: boolean;
  height: boolean;
  workouts: boolean;
}

export interface HealthData {
  steps?: number;
  activeEnergy?: number;
  heartRate?: number;
  sleep?: {
    duration: number; // in hours
    quality: 'poor' | 'fair' | 'good' | 'excellent';
  };
  bodyMass?: number; // in kg
  height?: number; // in cm
  workouts?: Array<{
    type: string;
    duration: number; // in minutes
    calories: number;
    date: string;
  }>;
}

class HealthService {
  private isAvailable: boolean = false;
  private permissionsGranted: HealthDataTypes = {
    steps: false,
    activeEnergy: false,
    heartRate: false,
    sleep: false,
    bodyMass: false,
    height: false,
    workouts: false,
  };

  constructor() {
    this.isAvailable = Platform.OS === 'ios';
  }

  /**
   * Check if Apple Health is available
   */
  isHealthAvailable(): boolean {
    return this.isAvailable;
  }

  /**
   * Request permissions for health data
   */
  async requestPermissions(dataTypes: HealthDataTypes): Promise<boolean> {
    if (!this.isAvailable) {
      console.warn('Apple Health is not available on this platform');
      return false;
    }

    try {
      // In a real implementation, you would use expo-health-kit here
      // For now, we'll simulate the permission request
      
      console.log('Requesting health permissions for:', dataTypes);
      
      // Simulate permission dialog
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate user granting permissions
      this.permissionsGranted = { ...dataTypes };
      
      return true;
    } catch (error) {
      console.error('Failed to request health permissions:', error);
      return false;
    }
  }

  /**
   * Get current permissions status
   */
  getPermissions(): HealthDataTypes {
    return { ...this.permissionsGranted };
  }

  /**
   * Read health data for today
   */
  async readTodaysData(): Promise<HealthData> {
    if (!this.isAvailable) {
      console.warn('Apple Health is not available');
      return {};
    }

    try {
      const data: HealthData = {};

      // Simulate reading steps
      if (this.permissionsGranted.steps) {
        data.steps = Math.floor(Math.random() * 10000) + 2000; // 2000-12000 steps
      }

      // Simulate reading active energy
      if (this.permissionsGranted.activeEnergy) {
        data.activeEnergy = Math.floor(Math.random() * 500) + 100; // 100-600 calories
      }

      // Simulate reading heart rate
      if (this.permissionsGranted.heartRate) {
        data.heartRate = Math.floor(Math.random() * 40) + 60; // 60-100 bpm
      }

      // Simulate reading sleep data
      if (this.permissionsGranted.sleep) {
        const sleepHours = Math.random() * 4 + 6; // 6-10 hours
        data.sleep = {
          duration: Math.round(sleepHours * 10) / 10,
          quality: sleepHours > 8 ? 'excellent' : sleepHours > 7 ? 'good' : sleepHours > 6 ? 'fair' : 'poor',
        };
      }

      // Simulate reading body mass
      if (this.permissionsGranted.bodyMass) {
        data.bodyMass = Math.round((Math.random() * 40 + 50) * 10) / 10; // 50-90 kg
      }

      // Simulate reading height
      if (this.permissionsGranted.height) {
        data.height = Math.floor(Math.random() * 40) + 160; // 160-200 cm
      }

      // Simulate reading workouts
      if (this.permissionsGranted.workouts) {
        const workoutTypes = ['Running', 'Walking', 'Cycling', 'Swimming', 'Strength Training'];
        const numWorkouts = Math.floor(Math.random() * 3); // 0-2 workouts today
        
        data.workouts = Array.from({ length: numWorkouts }, (_, index) => ({
          type: workoutTypes[Math.floor(Math.random() * workoutTypes.length)],
          duration: Math.floor(Math.random() * 60) + 15, // 15-75 minutes
          calories: Math.floor(Math.random() * 300) + 50, // 50-350 calories
          date: new Date().toISOString(),
        }));
      }

      return data;
    } catch (error) {
      console.error('Failed to read health data:', error);
      return {};
    }
  }

  /**
   * Read health data for a specific date range
   */
  async readDataForDateRange(startDate: Date, endDate: Date): Promise<HealthData[]> {
    if (!this.isAvailable) {
      console.warn('Apple Health is not available');
      return [];
    }

    try {
      // Simulate reading historical data
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const data: HealthData[] = [];

      for (let i = 0; i < days; i++) {
        const dayData = await this.readTodaysData();
        data.push(dayData);
      }

      return data;
    } catch (error) {
      console.error('Failed to read historical health data:', error);
      return [];
    }
  }

  /**
   * Calculate daily calorie burn based on health data
   */
  calculateDailyCalorieBurn(healthData: HealthData, userProfile: {
    age: number;
    weight: number;
    height: number;
    gender: 'male' | 'female';
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  }): number {
    try {
      // Base Metabolic Rate (BMR) calculation using Mifflin-St Jeor Equation
      let bmr: number;
      
      if (userProfile.gender === 'male') {
        bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age + 5;
      } else {
        bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age - 161;
      }

      // Activity factor
      const activityFactors = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9,
      };

      let totalCalories = bmr * activityFactors[userProfile.activityLevel];

      // Add calories from Apple Health active energy
      if (healthData.activeEnergy) {
        totalCalories += healthData.activeEnergy;
      }

      // Add calories from workouts
      if (healthData.workouts) {
        const workoutCalories = healthData.workouts.reduce((total, workout) => total + workout.calories, 0);
        totalCalories += workoutCalories;
      }

      return Math.round(totalCalories);
    } catch (error) {
      console.error('Failed to calculate calorie burn:', error);
      return 2000; // Default fallback
    }
  }

  /**
   * Get health insights based on data
   */
  getHealthInsights(healthData: HealthData): Array<{
    type: 'positive' | 'neutral' | 'warning';
    title: string;
    message: string;
    icon: string;
  }> {
    const insights: Array<{
      type: 'positive' | 'neutral' | 'warning';
      title: string;
      message: string;
      icon: string;
    }> = [];

    // Steps insights
    if (healthData.steps !== undefined) {
      if (healthData.steps >= 10000) {
        insights.push({
          type: 'positive',
          title: 'Harika Adım Sayısı! 🎉',
          message: `${healthData.steps.toLocaleString()} adım attınız. Günlük hedefi aştınız!`,
          icon: 'walk',
        });
      } else if (healthData.steps >= 7500) {
        insights.push({
          type: 'neutral',
          title: 'İyi Adım Sayısı',
          message: `${healthData.steps.toLocaleString()} adım. Hedefe ${(10000 - healthData.steps).toLocaleString()} adım kaldı.`,
          icon: 'walk',
        });
      } else {
        insights.push({
          type: 'warning',
          title: 'Daha Aktif Olun',
          message: `Sadece ${healthData.steps.toLocaleString()} adım. Biraz daha hareket edin!`,
          icon: 'walk',
        });
      }
    }

    // Sleep insights
    if (healthData.sleep) {
      if (healthData.sleep.duration >= 7 && healthData.sleep.duration <= 9) {
        insights.push({
          type: 'positive',
          title: 'Mükemmel Uyku! 😴',
          message: `${healthData.sleep.duration} saat uyudunuz. Kaliteli dinlenme!`,
          icon: 'moon',
        });
      } else if (healthData.sleep.duration < 6) {
        insights.push({
          type: 'warning',
          title: 'Yetersiz Uyku',
          message: `Sadece ${healthData.sleep.duration} saat uyku. Daha fazla dinlenmeye ihtiyacınız var.`,
          icon: 'moon',
        });
      }
    }

    // Heart rate insights
    if (healthData.heartRate) {
      if (healthData.heartRate >= 60 && healthData.heartRate <= 100) {
        insights.push({
          type: 'positive',
          title: 'Normal Kalp Atışı',
          message: `${healthData.heartRate} bpm - Sağlıklı aralıkta.`,
          icon: 'heart',
        });
      } else {
        insights.push({
          type: 'neutral',
          title: 'Kalp Atışı Takibi',
          message: `${healthData.heartRate} bpm kaydedildi.`,
          icon: 'heart',
        });
      }
    }

    // Workout insights
    if (healthData.workouts && healthData.workouts.length > 0) {
      const totalWorkoutTime = healthData.workouts.reduce((total, workout) => total + workout.duration, 0);
      const totalWorkoutCalories = healthData.workouts.reduce((total, workout) => total + workout.calories, 0);
      
      insights.push({
        type: 'positive',
        title: 'Aktif Gün! 💪',
        message: `${healthData.workouts.length} antrenman, ${totalWorkoutTime} dakika, ${totalWorkoutCalories} kalori yakıldı.`,
        icon: 'fitness',
      });
    }

    return insights;
  }
}

// Export singleton instance
export default new HealthService(); 