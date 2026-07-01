import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Input } from '../../components';
import { BorderRadius, Colors, FontSize, Spacing } from '../../constants/Colors';
import { useI18n } from '../../hooks/useI18n';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

interface GoalsScreenProps {
  onNext: (data: GoalsData) => void;
  onBack: () => void;
  initialData?: Partial<GoalsData>;
}

export interface GoalsData {
  goalType: 'lose_weight' | 'maintain_weight' | 'gain_weight';
  currentWeight: number;
  goalWeight?: number;
  weeklyGoal?: number; // kg per week
  deadline?: Date;
}

export default function GoalsScreen({
  onNext,
  onBack,
  initialData
}: GoalsScreenProps) {
  const { t } = useI18n();
  const screen = useResponsiveScreen();

  const [formData, setFormData] = useState<GoalsData>({
    goalType: initialData?.goalType || 'lose_weight',
    currentWeight: initialData?.currentWeight || 70,
    goalWeight: initialData?.goalWeight,
    weeklyGoal: initialData?.weeklyGoal || 0.5,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const goalTypes = [
    {
      value: 'lose_weight',
      title: t('onboarding.goals.loseWeight'),
      description: 'Kilo vermek ve form almak',
      icon: 'trending-down-outline',
      color: Colors.status.error,
    },
    {
      value: 'maintain_weight',
      title: t('onboarding.goals.maintainWeight'),
      description: 'Mevcut kilomu korumak',
      icon: 'remove-outline',
      color: Colors.primary[500],
    },
    {
      value: 'gain_weight',
      title: t('onboarding.goals.gainWeight'),
      description: 'Kilo almak ve kas yapmak',
      icon: 'trending-up-outline',
      color: Colors.status.success,
    },
  ];

  const weeklyGoalOptions = [
    { value: 0.25, label: '0.25 kg', description: 'Yavaş ve sürdürülebilir' },
    { value: 0.5, label: '0.5 kg', description: 'Dengeli bir yaklaşım' },
    { value: 0.75, label: '0.75 kg', description: 'Hızlı ilerleme' },
    { value: 1, label: '1 kg', description: 'Maksimum hız' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.currentWeight < 30 || formData.currentWeight > 300) {
      newErrors.currentWeight = 'Mevcut kilo 30-300 kg arasında olmalıdır';
    }

    if (formData.goalType !== 'maintain_weight') {
      if (!formData.goalWeight) {
        newErrors.goalWeight = 'Hedef kilo gereklidir';
      } else if (formData.goalWeight < 30 || formData.goalWeight > 300) {
        newErrors.goalWeight = 'Hedef kilo 30-300 kg arasında olmalıdır';
      } else if (formData.goalType === 'lose_weight' && formData.goalWeight >= formData.currentWeight) {
        newErrors.goalWeight = 'Hedef kilo mevcut kilodan düşük olmalıdır';
      } else if (formData.goalType === 'gain_weight' && formData.goalWeight <= formData.currentWeight) {
        newErrors.goalWeight = 'Hedef kilo mevcut kilodan yüksek olmalıdır';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(formData);
    } else {
      Alert.alert(t('common.error'), t('errors.pleaseCompleteForm'));
    }
  };

  const getWeightDifference = () => {
    if (!formData.goalWeight) return 0;
    return Math.abs(formData.goalWeight - formData.currentWeight);
  };

  const getEstimatedTime = () => {
    if (!formData.goalWeight || !formData.weeklyGoal) return 0;
    const weightDiff = getWeightDifference();
    return Math.ceil(weightDiff / formData.weeklyGoal);
  };

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
    titleSection: {
      marginBottom: screen.getValue({
        small: Spacing.lg,
        medium: Spacing.xl,
        large: Spacing.xxl,
      }),
      alignItems: screen.isTablet ? 'center' : 'flex-start',
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
      textAlign: screen.isTablet ? 'center' : 'left',
    },
    subtitle: {
      fontSize: screen.getValue({
        small: FontSize.md,
        medium: FontSize.lg,
        large: FontSize.xl,
      }),
      color: Colors.text.secondary,
      textAlign: screen.isTablet ? 'center' : 'left',
      maxWidth: screen.isTablet ? 600 : undefined,
    },
    goalTypesContainer: {
      marginBottom: Spacing.lg,
      gap: Spacing.sm,
    },
    goalType: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.lg,
      borderWidth: 2,
      borderColor: Colors.border.light,
      borderRadius: BorderRadius.lg,
      backgroundColor: Colors.background.secondary,
    },
    goalTypeActive: {
      borderColor: Colors.primary[500],
      backgroundColor: Colors.primary[50],
    },
    goalTypeIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Spacing.md,
    },
    goalTypeText: {
      flex: 1,
    },
    goalTypeTitle: {
      fontSize: FontSize.lg,
      fontWeight: '600',
      color: Colors.text.primary,
      marginBottom: Spacing.xs,
    },
    goalTypeTitleActive: {
      color: Colors.primary[500],
    },
    goalTypeDescription: {
      fontSize: FontSize.sm,
      color: Colors.text.secondary,
    },
    weightsContainer: {
      marginBottom: Spacing.lg,
    },
    weightsRow: {
      flexDirection: screen.isTablet ? 'row' : 'row',
      gap: Spacing.md,
    },
    weightInput: {
      flex: 1,
    },
    weeklyGoalContainer: {
      marginBottom: Spacing.lg,
    },
    sectionTitle: {
      fontSize: FontSize.lg,
      fontWeight: 'bold',
      color: Colors.text.primary,
      marginBottom: Spacing.md,
    },
    weeklyGoalOptions: {
      gap: Spacing.sm,
    },
    weeklyGoalOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: Spacing.lg,
      borderWidth: 1,
      borderColor: Colors.border.light,
      borderRadius: BorderRadius.md,
      backgroundColor: Colors.background.secondary,
    },
    weeklyGoalOptionActive: {
      borderColor: Colors.primary[500],
      backgroundColor: Colors.primary[50],
    },
    weeklyGoalInfo: {
      flex: 1,
    },
    weeklyGoalLabel: {
      fontSize: FontSize.md,
      fontWeight: '600',
      color: Colors.text.primary,
      marginBottom: Spacing.xs,
    },
    weeklyGoalLabelActive: {
      color: Colors.primary[500],
    },
    weeklyGoalDesc: {
      fontSize: FontSize.sm,
      color: Colors.text.secondary,
    },
    summaryCard: {
      marginBottom: Spacing.xl,
    },
    summaryTitle: {
      fontSize: FontSize.lg,
      fontWeight: 'bold',
      color: Colors.text.primary,
      marginBottom: Spacing.md,
      textAlign: 'center',
    },
    summaryContent: {
      alignItems: 'center',
    },
    summaryWeightDiff: {
      fontSize: FontSize['2xl'],
      fontWeight: 'bold',
      color: Colors.primary[500],
      marginBottom: Spacing.xs,
    },
    summaryEstimate: {
      fontSize: FontSize.md,
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
              <View style={[styles.progressFill, { width: '50%' }]} />
            </View>
            <Text style={styles.progressText}>
              {t('onboarding.step')} 2{t('onboarding.of')}4
            </Text>
          </View>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleSection}>
            <Text style={styles.title}>{t('onboarding.goals.title')}</Text>
            <Text style={styles.subtitle}>
              {t('onboarding.goals.subtitle')}
            </Text>
          </View>

          <Card style={styles.goalTypesContainer}>
            {goalTypes.map((goal) => (
              <TouchableOpacity
                key={goal.value}
                style={[
                  styles.goalType,
                  formData.goalType === goal.value && styles.goalTypeActive,
                ]}
                onPress={() => setFormData(prev => ({ 
                  ...prev, 
                  goalType: goal.value as any 
                }))}
              >
                <View style={[
                  styles.goalTypeIcon,
                  { backgroundColor: `${goal.color}15` }
                ]}>
                  <Ionicons
                    name={goal.icon as any}
                    size={24}
                    color={goal.color}
                  />
                </View>
                <View style={styles.goalTypeText}>
                  <Text style={[
                    styles.goalTypeTitle,
                    formData.goalType === goal.value && styles.goalTypeTitleActive,
                  ]}>
                    {goal.title}
                  </Text>
                  <Text style={styles.goalTypeDescription}>
                    {goal.description}
                  </Text>
                </View>
                {formData.goalType === goal.value && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={Colors.primary[500]}
                  />
                )}
              </TouchableOpacity>
            ))}
          </Card>

          <Card style={styles.weightsContainer}>
            <View style={styles.weightsRow}>
              <View style={styles.weightInput}>
                <Input
                  label={t('onboarding.goals.currentWeight')}
                  placeholder="70"
                  value={formData.currentWeight.toString()}
                  onChangeText={(text) => {
                    const weight = parseInt(text) || 0;
                    setFormData(prev => ({ ...prev, currentWeight: weight }));
                  }}
                  error={errors.currentWeight}
                  keyboardType="numeric"
                  icon={<Ionicons name="scale-outline" size={20} color="#6B7280" />}
                />
              </View>

              {formData.goalType !== 'maintain_weight' && (
                <View style={styles.weightInput}>
                  <Input
                    label={t('onboarding.goals.goalWeight')}
                    placeholder="65"
                    value={formData.goalWeight?.toString() || ''}
                    onChangeText={(text) => {
                      const weight = parseInt(text) || undefined;
                      setFormData(prev => ({ ...prev, goalWeight: weight }));
                    }}
                    error={errors.goalWeight}
                    keyboardType="numeric"
                    icon={<Ionicons name="flag-outline" size={20} color="#6B7280" />}
                  />
                </View>
              )}
            </View>
          </Card>

          {formData.goalType !== 'maintain_weight' && formData.goalWeight && (
            <>
              <Card style={styles.weeklyGoalContainer}>
                <Text style={styles.sectionTitle}>
                  {t('onboarding.goals.weeklyGoal')}
                </Text>
                <View style={styles.weeklyGoalOptions}>
                  {weeklyGoalOptions.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.weeklyGoalOption,
                        formData.weeklyGoal === option.value && styles.weeklyGoalOptionActive,
                      ]}
                      onPress={() => setFormData(prev => ({ 
                        ...prev, 
                        weeklyGoal: option.value 
                      }))}
                    >
                      <View style={styles.weeklyGoalInfo}>
                        <Text style={[
                          styles.weeklyGoalLabel,
                          formData.weeklyGoal === option.value && styles.weeklyGoalLabelActive,
                        ]}>
                          {option.label}{t('onboarding.goals.perWeek')}
                        </Text>
                        <Text style={styles.weeklyGoalDesc}>
                          {option.description}
                        </Text>
                      </View>
                      {formData.weeklyGoal === option.value && (
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color={Colors.primary[500]}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </Card>

              <Card style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Hedef Özeti</Text>
                <View style={styles.summaryContent}>
                  <Text style={styles.summaryWeightDiff}>
                    {getWeightDifference()} kg
                  </Text>
                  <Text style={styles.summaryEstimate}>
                    Tahmini süre: {getEstimatedTime()} hafta
                  </Text>
                </View>
              </Card>
            </>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={t('common.continue')}
            onPress={handleNext}
            fullWidth
            size="lg"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
} 