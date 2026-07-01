import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Dimensions,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import calorieStorageService from '../../src/services/calorieStorageService';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [calorieData, setCalorieData] = useState({
    currentCalories: 282, // Example data matching Cal AI design
    dailyGoal: 2000,
    percentage: 14,
    remaining: 1718,
    isOverGoal: false,
  });
  const [macroData, setMacroData] = useState({
    protein: { current: 19, target: 150, unit: 'g' },
    carbs: { current: 10, target: 200, unit: 'g' },
    fat: { current: 3, target: 50, unit: 'g' },
  });
  const [recentMeals, setRecentMeals] = useState<Array<{
    name: string;
    calories: number;
    time: string;
    analysis?: any;
  }>>([]);

  // Animations
  const progressWidth = useSharedValue(0);
  const cardScale = useSharedValue(0.9);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    loadData();
    
    // Start animations
    cardScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    textOpacity.value = withTiming(1, { duration: 800 });
  }, []);

  useEffect(() => {
    // Animate progress bar when data changes
    progressWidth.value = withTiming(calorieData.percentage, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });
  }, [calorieData.percentage]);

  const loadData = async () => {
    try {
      const data = await calorieStorageService.getDailyData();
      const dailyGoal = 2000; // Default goal, will be made configurable later
      
      const currentCalories = data.totalCalories || 0;
      const percentage = Math.min((currentCalories / dailyGoal) * 100, 100);
      const remaining = Math.max(dailyGoal - currentCalories, 0);
      const isOverGoal = currentCalories > dailyGoal;

      setCalorieData({
        currentCalories,
        dailyGoal,
        percentage,
        remaining,
        isOverGoal,
      });

      setRecentMeals(data.meals || []);
    } catch (error) {
      console.error('Error loading calorie data:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${progressWidth.value}%`, {
        duration: 1000,
        easing: Easing.out(Easing.cubic),
      }),
    };
  });

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: cardScale.value }],
      opacity: textOpacity.value,
    };
  });

  // Get current week days
  const getWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const dates = [];
    
    // Calculate dates for the week
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      const dayDiff = i - currentDay;
      date.setDate(today.getDate() + dayDiff);
      dates.push({
        letter: days[i],
        date: date.getDate(),
        isToday: i === currentDay,
      });
    }
    return dates;
  };

  const weekDays = getWeekDays();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.appName}>🍎 Cal AI</Text>
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={16} color="#FF6B35" />
              <Text style={styles.streakText}>0</Text>
            </View>
          </View>
        </View>

        {/* Calendar Week View */}
        <View style={styles.calendarContainer}>
          {weekDays.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCircle,
                day.isToday && styles.dayCircleActive,
              ]}
              onPress={() => {
                // Navigate to specific day
              }}
            >
              <Text style={[
                styles.dayLetter,
                day.isToday && styles.dayLetterActive,
              ]}>
                {day.letter}
              </Text>
              <Text style={[
                styles.dayNumber,
                day.isToday && styles.dayNumberActive,
              ]}>
                {day.date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Main Calorie Card */}
          <Animated.View style={[styles.mainCard, cardAnimatedStyle]}>
            <View style={styles.calorieSection}>
              <Text style={styles.caloriesLeftNumber}>{calorieData.remaining}</Text>
              <Text style={styles.caloriesLeftLabel}>Calories left</Text>
            </View>
            
            <View style={styles.calorieStatsSection}>
              <View style={styles.calorieStat}>
                <Ionicons name="flame" size={24} color="#FF6B35" />
                <Text style={styles.calorieStatNumber}>0</Text>
                <Text style={styles.calorieStatLabel}>Calories burned</Text>
              </View>
              
              <View style={styles.stepsStat}>
                <Ionicons name="footsteps" size={20} color="#6B7280" />
                <Text style={styles.stepsNumber}>+0</Text>
              </View>
            </View>
          </Animated.View>

          {/* Macro Cards */}
          <View style={styles.macroGrid}>
            <View style={styles.macroCard}>
              <Text style={styles.macroNumber}>{macroData.protein.target - macroData.protein.current}g</Text>
              <Text style={styles.macroLabel}>Protein left</Text>
              <View style={styles.macroProgress}>
                <View style={[styles.macroProgressBar, { 
                  width: `${(macroData.protein.current / macroData.protein.target) * 100}%`,
                  backgroundColor: '#EF4444'
                }]} />
              </View>
            </View>
            
            <View style={styles.macroCard}>
              <Text style={styles.macroNumber}>{macroData.carbs.target - macroData.carbs.current}g</Text>
              <Text style={styles.macroLabel}>Carbs left</Text>
              <View style={styles.macroProgress}>
                <View style={[styles.macroProgressBar, { 
                  width: `${(macroData.carbs.current / macroData.carbs.target) * 100}%`,
                  backgroundColor: '#F59E0B'
                }]} />
              </View>
            </View>
            
            <View style={styles.macroCard}>
              <Text style={styles.macroNumber}>{macroData.fat.target - macroData.fat.current}g</Text>
              <Text style={styles.macroLabel}>Fat left</Text>
              <View style={styles.macroProgress}>
                <View style={[styles.macroProgressBar, { 
                  width: `${(macroData.fat.current / macroData.fat.target) * 100}%`,
                  backgroundColor: '#3B82F6'
                }]} />
              </View>
            </View>
          </View>

          {/* Water Section */}
          <View style={styles.waterSection}>
            <Ionicons name="water" size={24} color="#3B82F6" />
            <View style={styles.waterContent}>
              <Text style={styles.waterTitle}>Water</Text>
              <Text style={styles.waterAmount}>0 fl oz (0 cups)</Text>
            </View>
            <View style={styles.waterControls}>
              <TouchableOpacity style={styles.waterButton}>
                <Ionicons name="remove" size={20} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.waterButton}>
                <Ionicons name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Recently Uploaded */}
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Recently uploaded</Text>
            <View style={styles.emptyState}>
              <View style={styles.emptyPlaceholder} />
              <Text style={styles.emptyText}>Tap + to add your first meal of the day</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/(tabs)/food')}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  streakText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  dayCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleActive: {
    borderColor: '#FF6B35',
    borderStyle: 'solid',
    backgroundColor: '#FFFFFF',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayLetter: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    lineHeight: 14,
  },
  dayLetterActive: {
    color: '#FF6B35',
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
    lineHeight: 16,
  },
  dayNumberActive: {
    color: '#1F2937',
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for FAB
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  calorieSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  caloriesLeftNumber: {
    fontSize: 72,
    fontWeight: '800',
    color: '#1F2937',
    lineHeight: 72,
    letterSpacing: -2,
  },
  caloriesLeftLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 4,
  },
  calorieStatsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calorieStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  calorieStatNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
  },
  calorieStatLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  stepsStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepsNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  macroGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  macroCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 2,
  },
  macroNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  macroProgress: {
    width: '100%',
    height: 4,
    backgroundColor: '#F1F3F4',
    borderRadius: 2,
    overflow: 'hidden',
  },
  macroProgressBar: {
    height: '100%',
    borderRadius: 2,
  },
  waterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 2,
  },
  waterContent: {
    flex: 1,
    marginLeft: 12,
  },
  waterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  waterAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  waterControls: {
    flexDirection: 'row',
    gap: 8,
  },
  waterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F3F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyPlaceholder: {
    width: 80,
    height: 32,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
