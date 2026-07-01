import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../../components';
import { BorderRadius, Colors, FontSize, Spacing } from '../../constants/Colors';
import { useI18n } from '../../hooks/useI18n';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';

interface PreferencesScreenProps {
  onNext: (data: PreferencesData) => void;
  onBack: () => void;
  initialData?: Partial<PreferencesData>;
}

export interface PreferencesData {
  units: 'metric' | 'imperial';
  notifications: {
    mealReminders: boolean;
    waterReminders: boolean;
    exerciseReminders: boolean;
    progressUpdates: boolean;
    weeklyReports: boolean;
  };
  privacy: 'public' | 'friends' | 'private';
  language: 'tr' | 'en';
}

export default function PreferencesScreen({
  onNext,
  onBack,
  initialData
}: PreferencesScreenProps) {
  const { t, currentLocale, changeLocale } = useI18n();
  const screen = useResponsiveScreen();

  const [formData, setFormData] = useState<PreferencesData>({
    units: initialData?.units || 'metric',
    notifications: {
      mealReminders: initialData?.notifications?.mealReminders ?? true,
      waterReminders: initialData?.notifications?.waterReminders ?? true,
      exerciseReminders: initialData?.notifications?.exerciseReminders ?? false,
      progressUpdates: initialData?.notifications?.progressUpdates ?? true,
      weeklyReports: initialData?.notifications?.weeklyReports ?? true,
    },
    privacy: initialData?.privacy || 'private',
    language: initialData?.language || currentLocale,
  });

  const unitOptions = [
    {
      value: 'metric',
      title: t('onboarding.preferences.metric'),
      description: 'cm, kg, °C',
      icon: 'grid-outline',
    },
    {
      value: 'imperial',
      title: t('onboarding.preferences.imperial'),
      description: 'ft, lbs, °F',
      icon: 'apps-outline',
    },
  ];

  const privacyOptions = [
    {
      value: 'public',
      title: t('onboarding.preferences.privacyOptions.public'),
      description: 'Herkes görebilir',
      icon: 'globe-outline',
      color: Colors.status.warning,
    },
    {
      value: 'friends',
      title: t('onboarding.preferences.privacyOptions.friends'),
      description: 'Sadece arkadaşlar',
      icon: 'people-outline',
      color: Colors.primary[500],
    },
    {
      value: 'private',
      title: t('onboarding.preferences.privacyOptions.private'),
      description: 'Sadece ben',
      icon: 'lock-closed-outline',
      color: Colors.status.success,
    },
  ];

  const languageOptions = [
    { value: 'tr', title: 'Türkçe', flag: '🇹🇷' },
    { value: 'en', title: 'English', flag: '🇺🇸' },
  ];

  const notificationSettings = [
    {
      key: 'mealReminders',
      title: 'Yemek Hatırlatmaları',
      description: 'Öğün zamanlarında bildirim al',
      icon: 'restaurant-outline',
    },
    {
      key: 'waterReminders',
      title: 'Su Hatırlatmaları',
      description: 'Su içme hatırlatması',
      icon: 'water-outline',
    },
    {
      key: 'exerciseReminders',
      title: 'Egzersiz Hatırlatmaları',
      description: 'Egzersiz yapma zamanı',
      icon: 'fitness-outline',
    },
    {
      key: 'progressUpdates',
      title: 'İlerleme Güncellemeleri',
      description: 'Hedef ilerlemesi hakkında bilgi',
      icon: 'trending-up-outline',
    },
    {
      key: 'weeklyReports',
      title: 'Haftalık Raporlar',
      description: 'Haftalık özet raporları',
      icon: 'bar-chart-outline',
    },
  ];

  const handleLanguageChange = async (newLanguage: 'tr' | 'en') => {
    setFormData(prev => ({ ...prev, language: newLanguage }));
    await changeLocale(newLanguage);
  };

  const updateNotification = (key: keyof PreferencesData['notifications'], value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const handleNext = () => {
    onNext(formData);
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
    sectionCard: {
      marginBottom: Spacing.lg,
    },
    sectionTitle: {
      fontSize: FontSize.lg,
      fontWeight: 'bold',
      color: Colors.text.primary,
      marginBottom: Spacing.md,
    },
    optionsContainer: {
      gap: Spacing.sm,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.lg,
      borderWidth: 1,
      borderColor: Colors.border.light,
      borderRadius: BorderRadius.md,
      backgroundColor: Colors.background.secondary,
    },
    optionActive: {
      borderColor: Colors.primary[500],
      backgroundColor: Colors.primary[50],
    },
    optionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
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
    optionTitleActive: {
      color: Colors.primary[500],
    },
    optionDescription: {
      fontSize: FontSize.sm,
      color: Colors.text.secondary,
    },
    languageOption: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.lg,
      borderWidth: 1,
      borderColor: Colors.border.light,
      borderRadius: BorderRadius.md,
      backgroundColor: Colors.background.secondary,
    },
    languageFlag: {
      fontSize: 24,
      marginRight: Spacing.md,
    },
    languageTitle: {
      flex: 1,
      fontSize: FontSize.md,
      fontWeight: '600',
      color: Colors.text.primary,
    },
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border.light,
    },
    notificationContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    notificationIcon: {
      width: 35,
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    notificationText: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: FontSize.md,
      fontWeight: '600',
      color: Colors.text.primary,
      marginBottom: Spacing.xs,
    },
    notificationDesc: {
      fontSize: FontSize.sm,
      color: Colors.text.secondary,
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
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
            <Text style={styles.progressText}>
              {t('onboarding.step')} 3{t('onboarding.of')}4
            </Text>
          </View>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleSection}>
            <Text style={styles.title}>{t('onboarding.preferences.title')}</Text>
            <Text style={styles.subtitle}>
              {t('onboarding.preferences.subtitle')}
            </Text>
          </View>

          {/* Language Selection */}
          <Card style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
            <View style={styles.optionsContainer}>
              {languageOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.languageOption,
                    formData.language === option.value && styles.optionActive,
                  ]}
                  onPress={() => handleLanguageChange(option.value as 'tr' | 'en')}
                >
                  <Text style={styles.languageFlag}>{option.flag}</Text>
                  <Text style={styles.languageTitle}>{option.title}</Text>
                  {formData.language === option.value && (
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

          {/* Units Selection */}
          <Card style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{t('onboarding.preferences.units')}</Text>
            <View style={styles.optionsContainer}>
              {unitOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.option,
                    formData.units === option.value && styles.optionActive,
                  ]}
                  onPress={() => setFormData(prev => ({ 
                    ...prev, 
                    units: option.value as any 
                  }))}
                >
                  <View style={[
                    styles.optionIcon,
                    { backgroundColor: Colors.primary[50] }
                  ]}>
                    <Ionicons
                      name={option.icon as any}
                      size={20}
                      color={Colors.primary[500]}
                    />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={[
                      styles.optionTitle,
                      formData.units === option.value && styles.optionTitleActive,
                    ]}>
                      {option.title}
                    </Text>
                    <Text style={styles.optionDescription}>
                      {option.description}
                    </Text>
                  </View>
                  {formData.units === option.value && (
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

          {/* Notifications */}
          <Card style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{t('onboarding.preferences.notifications')}</Text>
            <Text style={styles.optionDescription}>
              {t('onboarding.preferences.notificationsDesc')}
            </Text>
            <View style={{ marginTop: Spacing.md }}>
              {notificationSettings.map((setting, index) => (
                <View key={setting.key} style={styles.notificationItem}>
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationIcon}>
                      <Ionicons
                        name={setting.icon as any}
                        size={20}
                        color={Colors.primary[500]}
                      />
                    </View>
                    <View style={styles.notificationText}>
                      <Text style={styles.notificationTitle}>
                        {setting.title}
                      </Text>
                      <Text style={styles.notificationDesc}>
                        {setting.description}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={formData.notifications[setting.key as keyof PreferencesData['notifications']]}
                    onValueChange={(value) => updateNotification(
                      setting.key as keyof PreferencesData['notifications'], 
                      value
                    )}
                    trackColor={{ 
                      false: Colors.border.light, 
                      true: Colors.primary[100] 
                    }}
                    thumbColor={
                      formData.notifications[setting.key as keyof PreferencesData['notifications']]
                        ? Colors.primary[500] 
                        : Colors.text.muted
                    }
                  />
                </View>
              ))}
            </View>
          </Card>

          {/* Privacy */}
          <Card style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{t('onboarding.preferences.privacy')}</Text>
            <Text style={styles.optionDescription}>
              {t('onboarding.preferences.privacyDesc')}
            </Text>
            <View style={{ marginTop: Spacing.md, gap: Spacing.sm }}>
              {privacyOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.option,
                    formData.privacy === option.value && styles.optionActive,
                  ]}
                  onPress={() => setFormData(prev => ({ 
                    ...prev, 
                    privacy: option.value as any 
                  }))}
                >
                  <View style={[
                    styles.optionIcon,
                    { backgroundColor: `${option.color}15` }
                  ]}>
                    <Ionicons
                      name={option.icon as any}
                      size={20}
                      color={option.color}
                    />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={[
                      styles.optionTitle,
                      formData.privacy === option.value && styles.optionTitleActive,
                    ]}>
                      {option.title}
                    </Text>
                    <Text style={styles.optionDescription}>
                      {option.description}
                    </Text>
                  </View>
                  {formData.privacy === option.value && (
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