import AsyncStorage from '@react-native-async-storage/async-storage';

interface DailyCalorieData {
  totalCalories: number;
  dailyGoal: number;
  lastUpdated: string;
  meals: Array<{
    name: string;
    calories: number;
    time: string;
  }>;
}

class CalorieStorageService {
  private static readonly STORAGE_KEY_PREFIX = 'daily_calories_';
  private static readonly DEFAULT_DAILY_GOAL = 2000;

  /**
   * Get today's date in YYYY-MM-DD format
   */
  private getTodayKey(): string {
    const today = new Date().toISOString().split('T')[0];
    return `${CalorieStorageService.STORAGE_KEY_PREFIX}${today}`;
  }

  /**
   * Get current daily calorie data
   */
  async getDailyData(): Promise<DailyCalorieData> {
    try {
      const todayKey = this.getTodayKey();
      const stored = await AsyncStorage.getItem(todayKey);
      
      if (stored) {
        return JSON.parse(stored);
      }

      // Return default data for new day
      const defaultData: DailyCalorieData = {
        totalCalories: 0,
        dailyGoal: CalorieStorageService.DEFAULT_DAILY_GOAL,
        lastUpdated: new Date().toISOString(),
        meals: [],
      };

      await this.saveDailyData(defaultData);
      return defaultData;

    } catch (error) {
      console.error('Error getting daily data:', error);
      return {
        totalCalories: 0,
        dailyGoal: CalorieStorageService.DEFAULT_DAILY_GOAL,
        lastUpdated: new Date().toISOString(),
        meals: [],
      };
    }
  }

  /**
   * Save daily calorie data
   */
  async saveDailyData(data: DailyCalorieData): Promise<void> {
    try {
      const todayKey = this.getTodayKey();
      const updatedData = {
        ...data,
        lastUpdated: new Date().toISOString(),
      };

      await AsyncStorage.setItem(todayKey, JSON.stringify(updatedData));
      
      console.log('Daily data saved:', {
        calories: updatedData.totalCalories,
        goal: updatedData.dailyGoal,
        percentage: (updatedData.totalCalories / updatedData.dailyGoal) * 100,
      });

    } catch (error) {
      console.error('Error saving daily data:', error);
    }
  }

  /**
   * Add calories from AI analysis
   */
  async addCaloriesFromAnalysis(
    foodName: string,
    calories: number,
    analysisData?: any
  ): Promise<void> {
    try {
      const currentData = await this.getDailyData();
      
      const newMeal = {
        name: foodName,
        calories,
        time: new Date().toISOString(),
        analysis: analysisData,
      };

      const updatedData: DailyCalorieData = {
        ...currentData,
        totalCalories: currentData.totalCalories + calories,
        meals: [...currentData.meals, newMeal],
      };

      await this.saveDailyData(updatedData);

    } catch (error) {
      console.error('Error adding calories:', error);
    }
  }

  /**
   * Update daily goal
   */
  async updateDailyGoal(newGoal: number): Promise<void> {
    try {
      const currentData = await this.getDailyData();
      const updatedData = {
        ...currentData,
        dailyGoal: newGoal,
      };

      await this.saveDailyData(updatedData);

    } catch (error) {
      console.error('Error updating daily goal:', error);
    }
  }

  /**
   * Get progress percentage
   */
  async getProgress(): Promise<{
    percentage: number;
    current: number;
    goal: number;
    remaining: number;
    isOverGoal: boolean;
  }> {
    try {
      const data = await this.getDailyData();
      const percentage = Math.min((data.totalCalories / data.dailyGoal) * 100, 100);
      const remaining = Math.max(data.dailyGoal - data.totalCalories, 0);
      const isOverGoal = data.totalCalories > data.dailyGoal;

      return {
        percentage,
        current: data.totalCalories,
        goal: data.dailyGoal,
        remaining,
        isOverGoal,
      };

    } catch (error) {
      console.error('Error getting progress:', error);
      return {
        percentage: 0,
        current: 0,
        goal: CalorieStorageService.DEFAULT_DAILY_GOAL,
        remaining: CalorieStorageService.DEFAULT_DAILY_GOAL,
        isOverGoal: false,
      };
    }
  }

  /**
   * Reset daily data (for new day)
   */
  async resetDailyData(): Promise<void> {
    try {
      const currentData = await this.getDailyData();
      const resetData: DailyCalorieData = {
        totalCalories: 0,
        dailyGoal: currentData.dailyGoal, // Keep the same goal
        lastUpdated: new Date().toISOString(),
        meals: [],
      };

      await this.saveDailyData(resetData);

    } catch (error) {
      console.error('Error resetting daily data:', error);
    }
  }

  /**
   * Get weekly statistics
   */
  async getWeeklyStats(): Promise<Array<{
    date: string;
    calories: number;
    goal: number;
  }>> {
    try {
      const stats = [];
      const today = new Date();

      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];
        const storageKey = `${CalorieStorageService.STORAGE_KEY_PREFIX}${dateKey}`;

        const stored = await AsyncStorage.getItem(storageKey);
        const data = stored ? JSON.parse(stored) : null;

        stats.push({
          date: dateKey,
          calories: data?.totalCalories || 0,
          goal: data?.dailyGoal || CalorieStorageService.DEFAULT_DAILY_GOAL,
        });
      }

      return stats;

    } catch (error) {
      console.error('Error getting weekly stats:', error);
      return [];
    }
  }

  /**
   * Check if we need to reset for a new day
   */
  async checkAndResetForNewDay(): Promise<void> {
    try {
      const data = await this.getDailyData();
      const lastUpdate = new Date(data.lastUpdated);
      const today = new Date();
      
      // If last update was yesterday or earlier, reset
      if (lastUpdate.toDateString() !== today.toDateString()) {
        await this.resetDailyData();
        console.log('Daily data reset for new day');
      }

    } catch (error) {
      console.error('Error checking for new day reset:', error);
    }
  }
}

// Export singleton instance
export default new CalorieStorageService(); 