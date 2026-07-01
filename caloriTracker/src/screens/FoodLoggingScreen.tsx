import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components';
import { BorderRadius, Colors, FontSize, Spacing } from '../constants/Colors';
import { useI18n } from '../hooks/useI18n';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';

interface FoodLoggingScreenProps {
  onBack: () => void;
  onCameraCapture: () => void;
  onFoodSearch: () => void;
  onManualEntry: () => void;
}

export default function FoodLoggingScreen({
  onBack,
  onCameraCapture,
  onFoodSearch,
  onManualEntry,
}: FoodLoggingScreenProps) {
  const { t } = useI18n();
  const screen = useResponsiveScreen();

  const loggingOptions = [
    {
      id: 'camera',
      title: t('food.takePhoto'),
      description: 'AI ile otomatik analiz',
      icon: 'camera-outline',
      color: Colors.primary[500],
      gradient: Colors.primary.gradient,
      onPress: onCameraCapture,
      featured: true,
    },
    {
      id: 'search',
      title: t('food.searchFood'),
      description: 'Yemek veritabanından ara',
      icon: 'search-outline',
      color: Colors.secondary[500],
      gradient: Colors.secondary.gradient,
      onPress: onFoodSearch,
      featured: false,
    },
    {
      id: 'manual',
      title: t('food.manualEntry'),
      description: 'Elle besin değerleri gir',
      icon: 'create-outline',
      color: Colors.status.warning,
      gradient: ['#F59E0B', '#D97706'],
      onPress: onManualEntry,
      featured: false,
    },
  ];

  const quickActions = [
    { title: 'Kahvaltı', time: '07:00 - 10:00', icon: 'sunny-outline' },
    { title: 'Öğle', time: '12:00 - 15:00', icon: 'partly-sunny-outline' },
    { title: 'Akşam', time: '18:00 - 22:00', icon: 'moon-outline' },
    { title: 'Atıştırma', time: 'İstediğin zaman', icon: 'cafe-outline' },
  ];

  const recentFoods = [
    { name: 'Tavuk Göğsü', calories: 165, time: '2 saat önce' },
    { name: 'Salata', calories: 45, time: 'Dün' },
    { name: 'Yoğurt', calories: 80, time: 'Dün' },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background.primary,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: screen.getValue({
        small: Spacing.md,
        medium: Spacing.lg,
        large: Spacing.xl,
      }),
      paddingVertical: Spacing.md,
      backgroundColor: Colors.background.primary,
    },
    backButton: {
      padding: Spacing.sm,
      marginRight: Spacing.md,
    },
    headerTitle: {
      flex: 1,
      fontSize: screen.getValue({
        small: FontSize.lg,
        medium: FontSize.xl,
        large: FontSize['2xl'],
      }),
      fontWeight: 'bold',
      color: Colors.text.primary,
    },
    content: {
      flex: 1,
      paddingHorizontal: screen.getValue({
        small: Spacing.md,
        medium: Spacing.lg,
        large: Spacing.xl,
      }),
    },
    subtitle: {
      fontSize: screen.getValue({
        small: FontSize.md,
        medium: FontSize.lg,
        large: FontSize.xl,
      }),
      color: Colors.text.secondary,
      marginBottom: screen.getValue({
        small: Spacing.lg,
        medium: Spacing.xl,
        large: Spacing.xxl,
      }),
      textAlign: 'center',
    },
    optionsContainer: {
      marginBottom: screen.getValue({
        small: Spacing.lg,
        medium: Spacing.xl,
        large: Spacing.xxl,
      }),
    },
    featuredOption: {
      marginBottom: Spacing.lg,
      overflow: 'hidden',
    },
    featuredGradient: {
      padding: screen.getValue({
        small: Spacing.lg,
        medium: Spacing.xl,
        large: Spacing.xxl,
      }),
      alignItems: 'center',
      minHeight: screen.getValue({
        small: 140,
        medium: 160,
        large: 180,
      }),
      justifyContent: 'center',
    },
    featuredIcon: {
      width: screen.getValue({
        small: 60,
        medium: 70,
        large: 80,
      }),
      height: screen.getValue({
        small: 60,
        medium: 70,
        large: 80,
      }),
      borderRadius: screen.getValue({
        small: 30,
        medium: 35,
        large: 40,
      }),
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing.md,
    },
    featuredTitle: {
      fontSize: screen.getValue({
        small: FontSize.xl,
        medium: FontSize['2xl'],
        large: FontSize['3xl'],
      }),
      fontWeight: 'bold',
      color: Colors.text.inverse,
      marginBottom: Spacing.sm,
      textAlign: 'center',
    },
    featuredDescription: {
      fontSize: screen.getValue({
        small: FontSize.sm,
        medium: FontSize.md,
        large: FontSize.lg,
      }),
      color: 'rgba(255, 255, 255, 0.9)',
      textAlign: 'center',
    },
    regularOptions: {
      flexDirection: screen.isTablet ? 'row' : 'column',
      gap: Spacing.md,
    },
    option: {
      flex: screen.isTablet ? 1 : undefined,
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.lg,
      borderWidth: 1,
      borderColor: Colors.border.light,
      borderRadius: BorderRadius.lg,
      backgroundColor: Colors.background.secondary,
    },
    optionIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Spacing.md,
    },
    optionText: {
      flex: 1,
    },
    optionTitle: {
      fontSize: FontSize.md,
      fontWeight: '600',
      color: Colors.text.primary,
      marginBottom: Spacing.xs,
    },
    optionDescription: {
      fontSize: FontSize.sm,
      color: Colors.text.secondary,
    },
    sectionTitle: {
      fontSize: FontSize.lg,
      fontWeight: 'bold',
      color: Colors.text.primary,
      marginBottom: Spacing.md,
    },
    quickActionsContainer: {
      marginBottom: Spacing.lg,
    },
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
    },
    quickAction: {
      flex: screen.isTablet ? 0.23 : 0.48,
      aspectRatio: 1,
      padding: Spacing.md,
      borderRadius: BorderRadius.md,
      backgroundColor: Colors.background.secondary,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: Colors.border.light,
    },
    quickActionIcon: {
      marginBottom: Spacing.sm,
    },
    quickActionTitle: {
      fontSize: FontSize.sm,
      fontWeight: '600',
      color: Colors.text.primary,
      textAlign: 'center',
      marginBottom: Spacing.xs,
    },
    quickActionTime: {
      fontSize: FontSize.xs,
      color: Colors.text.muted,
      textAlign: 'center',
    },
    recentContainer: {
      marginBottom: Spacing.xxl,
    },
    recentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.sm,
      borderRadius: BorderRadius.md,
      backgroundColor: Colors.background.secondary,
      borderWidth: 1,
      borderColor: Colors.border.light,
    },
    recentItemLeft: {
      flex: 1,
    },
    recentItemName: {
      fontSize: FontSize.md,
      fontWeight: '600',
      color: Colors.text.primary,
      marginBottom: Spacing.xs,
    },
    recentItemTime: {
      fontSize: FontSize.sm,
      color: Colors.text.muted,
    },
    recentItemCalories: {
      fontSize: FontSize.sm,
      fontWeight: '600',
      color: Colors.primary[500],
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('food.addFood')}</Text>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.subtitle}>
            Yemeğini nasıl kaydetmek istiyorsun?
          </Text>

          <View style={styles.optionsContainer}>
            {/* Featured Camera Option */}
            {loggingOptions
              .filter(option => option.featured)
              .map((option) => (
                <Card key={option.id} style={styles.featuredOption}>
                  <TouchableOpacity onPress={option.onPress}>
                    <LinearGradient
                      colors={option.gradient as [string, string]}
                      style={styles.featuredGradient}
                    >
                      <View style={styles.featuredIcon}>
                        <Ionicons
                          name={option.icon as any}
                          size={screen.getValue({
                            small: 30,
                            medium: 35,
                            large: 40,
                          })}
                          color="white"
                        />
                      </View>
                      <Text style={styles.featuredTitle}>{option.title}</Text>
                      <Text style={styles.featuredDescription}>
                        {option.description}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Card>
              ))}

            {/* Regular Options */}
            <View style={styles.regularOptions}>
              {loggingOptions
                .filter(option => !option.featured)
                .map((option) => (
                  <TouchableOpacity 
                    key={option.id} 
                    style={styles.option}
                    onPress={option.onPress}
                  >
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
                    <View style={styles.optionText}>
                      <Text style={styles.optionTitle}>{option.title}</Text>
                      <Text style={styles.optionDescription}>
                        {option.description}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={Colors.text.muted}
                    />
                  </TouchableOpacity>
                ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <Text style={styles.sectionTitle}>Hızlı Öğün Ekleme</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.quickAction}
                  onPress={() => Alert.alert('Öğün', `${action.title} öğünü eklenecek`)}
                >
                  <Ionicons
                    name={action.icon as any}
                    size={24}
                    color={Colors.primary[500]}
                    style={styles.quickActionIcon}
                  />
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                  <Text style={styles.quickActionTime}>{action.time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Foods */}
          <View style={styles.recentContainer}>
            <Text style={styles.sectionTitle}>Son Eklenen Yemekler</Text>
            {recentFoods.map((food, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.recentItem}
                onPress={() => Alert.alert('Yemek', `${food.name} tekrar eklenecek`)}
              >
                <View style={styles.recentItemLeft}>
                  <Text style={styles.recentItemName}>{food.name}</Text>
                  <Text style={styles.recentItemTime}>{food.time}</Text>
                </View>
                <Text style={styles.recentItemCalories}>
                  {food.calories} kcal
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
} 