import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FoodScreen() {
  const loggingOptions = [
    {
      id: 'camera',
      title: 'Take Photo',
      description: 'AI automatic analysis',
      icon: 'camera-outline',
      color: '#FF6B35',
      featured: true,
    },
    {
      id: 'search',
      title: 'Search Food',
      description: 'Select from database',
      icon: 'search-outline',
      color: '#0EA5E9',
      featured: false,
    },
    {
      id: 'manual',
      title: 'Manual Entry',
      description: 'Enter nutrition values',
      icon: 'create-outline',
      color: '#F59E0B',
      featured: false,
    },
    {
      id: 'barcode',
      title: 'Scan Barcode',
      description: 'Scan product barcode',
      icon: 'scan-outline',
      color: '#10B981',
      featured: false,
    },
  ];

  const quickMeals = [
    { name: 'Breakfast', time: '07:00 - 10:00', icon: 'sunny-outline', color: '#F59E0B' },
    { name: 'Lunch', time: '12:00 - 15:00', icon: 'partly-sunny-outline', color: '#10B981' },
    { name: 'Dinner', time: '18:00 - 22:00', icon: 'moon-outline', color: '#8B5CF6' },
    { name: 'Snack', time: 'Anytime', icon: 'cafe-outline', color: '#EF4444' },
  ];

  const recentFoods = [
    { name: 'Chicken Breast', calories: 165, time: '2 hours ago' },
    { name: 'Salad', calories: 45, time: 'Yesterday' },
    { name: 'Yogurt', calories: 80, time: 'Yesterday' },
    { name: 'Apple', calories: 95, time: '3 days ago' },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F8FA',
    },
    safeArea: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: '#FFFFFF',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 3,
      elevation: 2,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '800',
      color: '#1F2937',
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    subtitle: {
      fontSize: 16,
      color: '#6B7280',
      textAlign: 'center',
      marginVertical: 20,
    },
    featuredCard: {
      marginBottom: 20,
      borderRadius: 20,
      overflow: 'hidden',
      shadowColor: '#FF6B35',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    featuredGradient: {
      padding: 32,
      alignItems: 'center',
      minHeight: 160,
      justifyContent: 'center',
    },
    featuredIcon: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    featuredTitle: {
      fontSize: 22,
      fontWeight: '800',
      color: '#FFFFFF',
      marginBottom: 6,
    },
    featuredDescription: {
      fontSize: 15,
      color: 'rgba(255, 255, 255, 0.9)',
      textAlign: 'center',
      fontWeight: '500',
    },
    optionsCard: {
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
    sectionTitle: {
      fontSize: 20,
      fontWeight: '800',
      color: '#1F2937',
      marginBottom: 20,
    },
    optionsList: {
      gap: 16,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#F7F8FA',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#F1F3F4',
    },
    optionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    optionContent: {
      flex: 1,
    },
    optionTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: '#1F2937',
      marginBottom: 4,
    },
    optionDescription: {
      fontSize: 14,
      color: '#6B7280',
      fontWeight: '500',
    },
    arrow: {
      marginLeft: 12,
    },
    quickMealsCard: {
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
    mealsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    mealItem: {
      width: '48%',
      aspectRatio: 1,
      padding: 20,
      backgroundColor: '#F7F8FA',
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#F1F3F4',
    },
    mealIcon: {
      marginBottom: 12,
    },
    mealName: {
      fontSize: 15,
      fontWeight: '700',
      color: '#1F2937',
      textAlign: 'center',
      marginBottom: 4,
    },
    mealTime: {
      fontSize: 12,
      color: '#6B7280',
      textAlign: 'center',
      fontWeight: '500',
    },
    recentCard: {
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
    recentList: {
      gap: 12,
    },
    recentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#F7F8FA',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#F1F3F4',
    },
    recentInfo: {
      flex: 1,
    },
    recentName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: 2,
    },
    recentTime: {
      fontSize: 13,
      color: '#6B7280',
      fontWeight: '500',
    },
    recentCalories: {
      fontSize: 15,
      fontWeight: '700',
      color: '#FF6B35',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add Food</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.subtitle}>
            Choose how you'd like to log your food
          </Text>

          {/* Featured Option - Camera */}
          <View style={styles.featuredCard}>
            <LinearGradient
              colors={['#FF6B35', '#FF8E53']}
              style={styles.featuredGradient}
            >
              <View style={styles.featuredIcon}>
                <Ionicons name="camera-outline" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.featuredTitle}>Take Photo</Text>
              <Text style={styles.featuredDescription}>
                AI automatic analysis
              </Text>
            </LinearGradient>
          </View>

          {/* Other Options */}
          <View style={styles.optionsCard}>
            <Text style={styles.sectionTitle}>Other Options</Text>
            <View style={styles.optionsList}>
              {loggingOptions.slice(1).map((option) => (
                <TouchableOpacity key={option.id} style={styles.option}>
                  <View style={[
                    styles.optionIcon,
                    { backgroundColor: `${option.color}15` }
                  ]}>
                    <Ionicons
                      name={option.icon as any}
                      size={24}
                      color={option.color}
                    />
                  </View>
                  <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionDescription}>
                      {option.description}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#9CA3AF"
                    style={styles.arrow}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Meals */}
          <View style={styles.quickMealsCard}>
            <Text style={styles.sectionTitle}>Quick Add by Meal</Text>
            <View style={styles.mealsGrid}>
              {quickMeals.map((meal, index) => (
                <TouchableOpacity key={index} style={styles.mealItem}>
                  <Ionicons
                    name={meal.icon as any}
                    size={28}
                    color={meal.color}
                    style={styles.mealIcon}
                  />
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealTime}>{meal.time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Foods */}
          <View style={styles.recentCard}>
            <Text style={styles.sectionTitle}>Recent Foods</Text>
            <View style={styles.recentList}>
              {recentFoods.map((food, index) => (
                <TouchableOpacity key={index} style={styles.recentItem}>
                  <View style={styles.recentInfo}>
                    <Text style={styles.recentName}>{food.name}</Text>
                    <Text style={styles.recentTime}>{food.time}</Text>
                  </View>
                  <Text style={styles.recentCalories}>
                    {food.calories} cal
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
} 