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
import { Button, Card } from '../../components';
import { Colors, FontSize, Spacing } from '../../constants/Colors';
import { useI18n } from '../../hooks/useI18n';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

interface CompletedScreenProps {
  onComplete: () => void;
  onBack: () => void;
  userData: {
    name: string;
    goalType: 'lose_weight' | 'maintain_weight' | 'gain_weight';
    currentWeight: number;
    goalWeight?: number;
    weeklyGoal?: number;
  };
}

export default function CompletedScreen({
  onComplete,
  onBack,
  userData
}: CompletedScreenProps) {
  const { t } = useI18n();
  const screen = useResponsiveScreen();

  const getGoalTypeText = () => {
    switch (userData.goalType) {
      case 'lose_weight':
        return t('onboarding.goals.loseWeight');
      case 'maintain_weight':
        return t('onboarding.goals.maintainWeight');
      case 'gain_weight':
        return t('onboarding.goals.gainWeight');
      default:
        return '';
    }
  };

  const getGoalTypeIcon = () => {
    switch (userData.goalType) {
      case 'lose_weight':
        return 'trending-down-outline';
      case 'maintain_weight':
        return 'remove-outline';
      case 'gain_weight':
        return 'trending-up-outline';
      default:
        return 'flag-outline';
    }
  };

  const getGoalTypeColor = () => {
    switch (userData.goalType) {
      case 'lose_weight':
        return Colors.status.error;
      case 'maintain_weight':
        return Colors.primary[500];
      case 'gain_weight':
        return Colors.status.success;
      default:
        return Colors.primary[500];
    }
  };

  const getWeightDifference = () => {
    if (!userData.goalWeight) return 0;
    return Math.abs(userData.goalWeight - userData.currentWeight);
  };

  const getEstimatedTime = () => {
    if (!userData.goalWeight || !userData.weeklyGoal) return 0;
    const weightDiff = getWeightDifference();
    return Math.ceil(weightDiff / userData.weeklyGoal);
  };

  const features = [
    {
      icon: 'camera-outline',
      title: 'AI Fotoğraf Analizi',
      description: 'Yemeklerini fotoğrafla ve kalori hesapla',
    },
    {
      icon: 'analytics-outline',
      title: 'İlerleme Takibi',
      description: 'Günlük, haftalık raporlar',
    },
    {
      icon: 'trophy-outline',
      title: 'Hedef Başarısı',
      description: 'Kişiselleştirilmiş motivasyon',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    },
    backButton: {
      padding: Spacing.sm,
      marginRight: Spacing.md,
    },
    progressContainer: {
      flex: 1,
    },
    progressBar: {
      height: 4,
      backgroundColor: Colors.border.light,
      borderRadius: 2,
      marginBottom: Spacing.xs,
    },
    progressFill: {
      height: '100%',
      backgroundColor: Colors.primary[500],
      borderRadius: 2,
    },
    progressText: {
      fontSize: screen.getValue({
        small: FontSize.xs,
        medium: FontSize.sm,
        large: FontSize.md,
      }),
      color: Colors.text.muted,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      paddingHorizontal: screen.getValue({
        small: Spacing.md,
        medium: Spacing.lg,
        large: Spacing.xl,
      }),
    },
    celebrationSection: {
      alignItems: 'center',
      paddingVertical: screen.getValue({
        small: Spacing.xl,
        medium: Spacing.xxl,
        large: Spacing.xxl * 1.5,
      }),
    },
    celebrationIcon: {
      width: screen.getValue({
        small: 80,
        medium: 100,
        large: 120,
      }),
      height: screen.getValue({
        small: 80,
        medium: 100,
        large: 120,
      }),
      borderRadius: screen.getValue({
        small: 40,
        medium: 50,
        large: 60,
      }),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing.lg,
    },
    title: {
      fontSize: screen.getValue({
        small: FontSize['2xl'],
        medium: FontSize['3xl'],
        large: FontSize['4xl'],
      }),
      fontWeight: 'bold',
      color: Colors.text.primary,
      marginBottom: Spacing.sm,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: screen.getValue({
        small: FontSize.md,
        medium: FontSize.lg,
        large: FontSize.xl,
      }),
      color: Colors.text.secondary,
      textAlign: 'center',
      lineHeight: screen.getValue({
        small: FontSize.md * 1.4,
        medium: FontSize.lg * 1.4,
        large: FontSize.xl * 1.4,
      }),
      maxWidth: screen.isTablet ? 600 : undefined,
    },
    userName: {
      color: Colors.primary[500],
      fontWeight: '600',
    },
    summaryCard: {
      marginBottom: Spacing.lg,
      overflow: 'hidden',
    },
    summaryGradient: {
      padding: screen.getValue({
        small: Spacing.lg,
        medium: Spacing.xl,
        large: Spacing.xxl,
      }),
      alignItems: 'center',
    },
    summaryTitle: {
      fontSize: FontSize.lg,
      fontWeight: 'bold',
      color: Colors.text.inverse,
      marginBottom: Spacing.md,
      textAlign: 'center',
    },
    goalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    goalIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Spacing.md,
    },
    goalText: {
      flex: 1,
    },
    goalType: {
      fontSize: FontSize.lg,
      fontWeight: '600',
      color: Colors.text.inverse,
      marginBottom: Spacing.xs,
    },
    goalDetails: {
      fontSize: FontSize.sm,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    estimateContainer: {
      alignItems: 'center',
      paddingTop: Spacing.md,
      borderTopWidth: 1,
      borderTopColor: 'rgba(255, 255, 255, 0.2)',
    },
    estimateText: {
      fontSize: FontSize.md,
      color: 'rgba(255, 255, 255, 0.9)',
      textAlign: 'center',
    },
    featuresSection: {
      marginBottom: screen.getValue({
        small: Spacing.lg,
        medium: Spacing.xl,
        large: Spacing.xxl,
      }),
    },
    featuresTitle: {
      fontSize: FontSize.lg,
      fontWeight: 'bold',
      color: Colors.text.primary,
      marginBottom: Spacing.md,
      textAlign: 'center',
    },
    featuresGrid: {
      flexDirection: screen.isTablet ? 'row' : 'column',
      gap: Spacing.md,
    },
    featureCard: {
      flex: screen.isTablet ? 1 : undefined,
      alignItems: 'center',
      padding: screen.getValue({
        small: Spacing.lg,
        medium: Spacing.xl,
        large: Spacing.xxl,
      }),
    },
    featureIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: Colors.primary[50],
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing.md,
    },
    featureTitle: {
      fontSize: FontSize.md,
      fontWeight: '600',
      color: Colors.text.primary,
      marginBottom: Spacing.xs,
      textAlign: 'center',
    },
    featureDescription: {
      fontSize: FontSize.sm,
      color: Colors.text.secondary,
      textAlign: 'center',
    },
    footer: {
      padding: screen.getValue({
        small: Spacing.md,
        medium: Spacing.lg,
        large: Spacing.xl,
      }),
      maxWidth: screen.isTablet ? 400 : undefined,
      width: '100%',
      alignSelf: 'center',
    },
  });

  return (
    <LinearGradient
      colors={['#FAFBFC', '#F7FAFC']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '100%' }]} />
            </View>
            <Text style={styles.progressText}>
              {t('onboarding.step')} 4{t('onboarding.of')}4
            </Text>
          </View>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.celebrationSection}>
            <LinearGradient
              colors={Colors.primary.gradient as [string, string]}
              style={styles.celebrationIcon}
            >
              <Ionicons 
                name="checkmark" 
                size={screen.getValue({
                  small: 40,
                  medium: 50,
                  large: 60,
                })} 
                color="white" 
              />
            </LinearGradient>
            
            <Text style={styles.title}>Tebrikler!</Text>
            <Text style={styles.subtitle}>
              <Text style={styles.userName}>{userData.name}</Text>, CaloriTracker'a hoş geldin! 
              Artık sağlıklı yaşam yolculuğun başlıyor.
            </Text>
          </View>

          <Card style={styles.summaryCard}>
            <LinearGradient
              colors={Colors.secondary.gradient as [string, string]}
              style={styles.summaryGradient}
            >
              <Text style={styles.summaryTitle}>Hedefin Özeti</Text>
              
              <View style={styles.goalContainer}>
                <View style={styles.goalIcon}>
                  <Ionicons
                    name={getGoalTypeIcon() as any}
                    size={20}
                    color="white"
                  />
                </View>
                <View style={styles.goalText}>
                  <Text style={styles.goalType}>
                    {getGoalTypeText()}
                  </Text>
                  <Text style={styles.goalDetails}>
                    {userData.currentWeight} kg
                    {userData.goalWeight && ` → ${userData.goalWeight} kg`}
                  </Text>
                </View>
              </View>

              {userData.goalType !== 'maintain_weight' && userData.goalWeight && (
                <View style={styles.estimateContainer}>
                  <Text style={styles.estimateText}>
                    📅 Tahmini süre: {getEstimatedTime()} hafta{'\n'}
                    🎯 Hedef: {getWeightDifference()} kg {userData.goalType === 'lose_weight' ? 'vermek' : 'almak'}
                  </Text>
                </View>
              )}
            </LinearGradient>
          </Card>

          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>Seni Bekleyen Özellikler</Text>
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <Card key={index} style={styles.featureCard} variant="outlined">
                  <View style={styles.featureIcon}>
                    <Ionicons 
                      name={feature.icon as any} 
                      size={24} 
                      color={Colors.primary[500]} 
                    />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </Card>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Uygulamayı Keşfet"
            onPress={onComplete}
            fullWidth
            size="lg"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
} 