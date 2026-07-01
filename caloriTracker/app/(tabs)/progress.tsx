import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  const weeklyData = {
    weightLoss: -1.2,
    calorieAvg: 1850,
    daysOnTrack: 5,
    totalDays: 7,
    weeklyGoal: 2000,
    achievements: 3,
  };

  const progressStats = [
    {
      title: 'Weight Loss',
      value: '-1.2 kg',
      subtitle: 'This week',
      icon: 'trending-down',
      color: '#10B981',
      progress: 60,
    },
    {
      title: 'Avg Calories',
      value: '1,850',
      subtitle: 'kcal/day',
      icon: 'flame',
      color: '#FF6B35',
      progress: 92,
    },
    {
      title: 'Goal Compliance',
      value: `${weeklyData.daysOnTrack}/${weeklyData.totalDays}`,
      subtitle: 'days',
      icon: 'checkmark-circle',
      color: '#0EA5E9',
      progress: (weeklyData.daysOnTrack / weeklyData.totalDays) * 100,
    },
    {
      title: 'Achievements',
      value: '3',
      subtitle: 'badges',
      icon: 'trophy',
      color: '#F59E0B',
      progress: 75,
    },
  ];

  const weeklyChart = [
    { day: 'Mon', calories: 1920, target: 2000 },
    { day: 'Tue', calories: 1850, target: 2000 },
    { day: 'Wed', calories: 1780, target: 2000 },
    { day: 'Thu', calories: 2100, target: 2000 },
    { day: 'Fri', calories: 1650, target: 2000 },
    { day: 'Sat', calories: 2200, target: 2000 },
    { day: 'Sun', calories: 1450, target: 2000 },
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
    periodSelector: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 6,
      marginVertical: 20,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 4,
    },
    periodButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: 'center',
    },
    periodButtonActive: {
      backgroundColor: '#FF6B35',
    },
    periodText: {
      fontSize: 15,
      fontWeight: '600',
      color: '#6B7280',
    },
    periodTextActive: {
      color: '#FFFFFF',
    },
    statsCard: {
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
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 16,
    },
    statItem: {
      width: (width - 76) / 2,
      padding: 20,
      backgroundColor: '#F7F8FA',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#F1F3F4',
      alignItems: 'center',
    },
    statHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      gap: 8,
    },
    statIcon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: '#6B7280',
      textAlign: 'center',
    },
    statValue: {
      fontSize: 24,
      fontWeight: '800',
      color: '#1F2937',
      marginBottom: 4,
      textAlign: 'center',
    },
    statSubtitle: {
      fontSize: 13,
      fontWeight: '500',
      color: '#9CA3AF',
      marginBottom: 12,
      textAlign: 'center',
    },
    progressBar: {
      width: '100%',
      height: 6,
      backgroundColor: '#F1F3F4',
      borderRadius: 3,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 3,
    },
    chartCard: {
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
    chartContainer: {
      height: 200,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingTop: 20,
    },
    chartBar: {
      flex: 1,
      marginHorizontal: 4,
      alignItems: 'center',
    },
    bar: {
      width: '100%',
      backgroundColor: '#FF6B35',
      borderRadius: 4,
      marginBottom: 8,
      minHeight: 20,
    },
    targetLine: {
      position: 'absolute',
      width: '100%',
      height: 2,
      backgroundColor: '#E5E7EB',
      borderRadius: 1,
    },
    chartDay: {
      fontSize: 12,
      fontWeight: '600',
      color: '#6B7280',
    },
    chartValue: {
      fontSize: 11,
      fontWeight: '500',
      color: '#9CA3AF',
      marginBottom: 4,
    },
    summaryCard: {
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
    summaryContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    summaryLeft: {
      flex: 1,
    },
    summaryNumber: {
      fontSize: 36,
      fontWeight: '800',
      color: '#1F2937',
      marginBottom: 4,
    },
    summaryLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#6B7280',
      marginBottom: 8,
    },
    summaryDescription: {
      fontSize: 14,
      fontWeight: '500',
      color: '#9CA3AF',
    },
    summaryIcon: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: '#FF6B3515',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Progress</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Period Selector */}
          <View style={styles.periodSelector}>
            {(['week', 'month', 'year'] as const).map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text
                  style={[
                    styles.periodText,
                    selectedPeriod === period && styles.periodTextActive,
                  ]}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Summary Card */}
          <View style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Weekly Summary</Text>
            <View style={styles.summaryContent}>
              <View style={styles.summaryLeft}>
                <Text style={styles.summaryNumber}>-1.2</Text>
                <Text style={styles.summaryLabel}>kg lost this week</Text>
                <Text style={styles.summaryDescription}>
                  You're on track to reach your goal!
                </Text>
              </View>
              <View style={styles.summaryIcon}>
                <Ionicons name="trending-down" size={32} color="#FF6B35" />
              </View>
            </View>
          </View>

          {/* Progress Stats */}
          <View style={styles.statsCard}>
            <Text style={styles.sectionTitle}>Key Metrics</Text>
            <View style={styles.statsGrid}>
              {progressStats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <View style={styles.statHeader}>
                    <View style={[
                      styles.statIcon,
                      { backgroundColor: `${stat.color}15` }
                    ]}>
                      <Ionicons
                        name={stat.icon as any}
                        size={20}
                        color={stat.color}
                      />
                    </View>
                  </View>
                  <Text style={styles.statTitle}>{stat.title}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${stat.progress}%`,
                          backgroundColor: stat.color,
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Weekly Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.sectionTitle}>Daily Calories</Text>
            <View style={styles.chartContainer}>
              {weeklyChart.map((data, index) => {
                const height = (data.calories / 2500) * 160; // Max height 160px
                const targetHeight = (data.target / 2500) * 160;
                
                return (
                  <View key={index} style={styles.chartBar}>
                    <Text style={styles.chartValue}>{data.calories}</Text>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: Math.max(height, 20),
                          backgroundColor: data.calories > data.target ? '#F59E0B' : '#FF6B35',
                        },
                      ]}
                    />
                    <Text style={styles.chartDay}>{data.day}</Text>
                    <View
                      style={[
                        styles.targetLine,
                        { bottom: targetHeight + 32 },
                      ]}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
} 