import { Ionicons } from '@expo/vector-icons';
import * as StoreReview from 'expo-store-review';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components';
import { BorderRadius, Colors, FontSize, Spacing } from '../constants/Colors';
import { useI18n } from '../hooks/useI18n';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import healthService from '../services/healthService';

interface HealthConnectScreenProps {
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

// Health data types we want to access
const healthDataTypes = [
  {
    id: 'steps',
    titleKey: 'health.dataTypes.steps',
    descriptionKey: 'health.descriptions.steps',
    icon: 'walk-outline',
    color: Colors.primary[500],
    enabled: true,
  },
  {
    id: 'activeEnergy',
    titleKey: 'health.dataTypes.activeEnergy',
    descriptionKey: 'health.descriptions.activeEnergy',
    icon: 'flame-outline',
    color: Colors.status.error,
    enabled: true,
  },
  {
    id: 'heartRate',
    titleKey: 'health.dataTypes.heartRate',
    descriptionKey: 'health.descriptions.heartRate',
    icon: 'heart-outline',
    color: Colors.status.success,
    enabled: true,
  },
  {
    id: 'sleep',
    titleKey: 'health.dataTypes.sleep',
    descriptionKey: 'health.descriptions.sleep',
    icon: 'moon-outline',
    color: Colors.secondary[500],
    enabled: true,
  },
  {
    id: 'bodyMass',
    titleKey: 'health.dataTypes.bodyMass',
    descriptionKey: 'health.descriptions.bodyMass',
    icon: 'scale-outline',
    color: Colors.status.warning,
    enabled: true,
  },
  {
    id: 'height',
    titleKey: 'health.dataTypes.height',
    descriptionKey: 'health.descriptions.height',
    icon: 'resize-outline',
    color: Colors.text.secondary,
    enabled: false, // Only read once
  },
  {
    id: 'workouts',
    titleKey: 'health.dataTypes.workouts',
    descriptionKey: 'health.descriptions.workouts',
    icon: 'fitness-outline',
    color: Colors.primary[600],
    enabled: true,
  },
];

export default function HealthConnectScreen({
  onBack,
  onContinue,
  onSkip,
}: HealthConnectScreenProps) {
  const { t } = useI18n();
  const screen = useResponsiveScreen();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showSupportQuestion, setShowSupportQuestion] = useState(false);

  const handleConnectHealth = async () => {
    // Check if iOS
    if (!healthService.isHealthAvailable()) {
      Alert.alert(
        t('health.errors.iosOnly'),
        '',
        [{ text: t('common.ok'), onPress: onContinue }]
      );
      return;
    }

    setIsConnecting(true);

    try {
      // Request permissions for all health data types
      const requestedPermissions = {
        steps: true,
        activeEnergy: true,
        heartRate: true,
        sleep: true,
        bodyMass: true,
        height: true,
        workouts: true,
      };

      const permissionsGranted = await healthService.requestPermissions(requestedPermissions);
      
      if (permissionsGranted) {
        // Show success and support question
        setShowSupportQuestion(true);
      } else {
        Alert.alert(
          t('common.error'),
          t('health.errors.permissionDenied'),
          [
            { text: t('common.retry'), onPress: handleConnectHealth },
            { text: t('health.skip'), onPress: onSkip },
          ]
        );
      }
      
    } catch (error) {
      console.error('Health connection failed:', error);
      Alert.alert(
        t('common.error'),
        t('health.errors.connectionFailed'),
        [
          { text: t('common.retry'), onPress: handleConnectHealth },
          { text: t('health.skip'), onPress: onSkip },
        ]
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSupportYes = async () => {
    try {
      // Request in-app review
      if (await StoreReview.hasAction()) {
        await StoreReview.requestReview();
      }
    } catch (error) {
      console.error('Store review failed:', error);
    }
    
    // Continue to main app
    onContinue();
  };

  const handleSupportNo = () => {
    // Continue to main app without review
    onContinue();
  };

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
    skipButton: {
      padding: Spacing.sm,
    },
    skipText: {
      fontSize: FontSize.md,
      color: Colors.text.muted,
      fontWeight: '600',
    },
    content: {
      flex: 1,
      paddingHorizontal: screen.getValue({
        small: Spacing.md,
        medium: Spacing.lg,
        large: Spacing.xl,
      }),
    },
    heroSection: {
      alignItems: 'center',
      marginBottom: screen.getValue({
        small: Spacing.xl,
        medium: Spacing.xxl,
        large: Spacing.xxl,
      }),
    },
    healthIcon: {
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
      backgroundColor: Colors.status.error,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing.lg,
      shadowColor: Colors.status.error,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
    },
    title: {
      fontSize: screen.getValue({
        small: FontSize['2xl'],
        medium: FontSize['3xl'],
        large: FontSize['4xl'],
      }),
      fontWeight: 'bold',
      color: Colors.text.primary,
      textAlign: 'center',
      marginBottom: Spacing.md,
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
        small: FontSize.md * 1.5,
        medium: FontSize.lg * 1.5,
        large: FontSize.xl * 1.5,
      }),
    },
    permissionsSection: {
      marginBottom: Spacing.xl,
    },
    sectionTitle: {
      fontSize: FontSize.lg,
      fontWeight: 'bold',
      color: Colors.text.primary,
      marginBottom: Spacing.md,
    },
    permissionsList: {
      gap: Spacing.sm,
    },
    permissionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.lg,
      backgroundColor: Colors.background.secondary,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: Colors.border.light,
    },
    permissionIcon: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Spacing.md,
    },
    permissionContent: {
      flex: 1,
    },
    permissionTitle: {
      fontSize: FontSize.md,
      fontWeight: '600',
      color: Colors.text.primary,
      marginBottom: Spacing.xs,
    },
    permissionDescription: {
      fontSize: FontSize.sm,
      color: Colors.text.secondary,
      lineHeight: FontSize.sm * 1.4,
    },
    permissionStatus: {
      marginLeft: Spacing.sm,
    },
    benefitsSection: {
      marginBottom: Spacing.xl,
    },
    benefitItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: Spacing.md,
    },
    benefitIcon: {
      marginRight: Spacing.md,
      marginTop: 2,
    },
    benefitText: {
      flex: 1,
      fontSize: FontSize.md,
      color: Colors.text.secondary,
      lineHeight: FontSize.md * 1.4,
    },
    privacySection: {
      backgroundColor: Colors.primary[50],
      padding: Spacing.lg,
      borderRadius: BorderRadius.md,
      marginBottom: Spacing.xl,
    },
    privacyTitle: {
      fontSize: FontSize.md,
      fontWeight: '600',
      color: Colors.primary[700],
      marginBottom: Spacing.sm,
    },
    privacyText: {
      fontSize: FontSize.sm,
      color: Colors.primary[600],
      lineHeight: FontSize.sm * 1.4,
    },
    actionsSection: {
      paddingBottom: Spacing.xl,
    },
    connectButton: {
      marginBottom: Spacing.md,
    },
    supportOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    supportCard: {
      backgroundColor: Colors.background.primary,
      margin: Spacing.xl,
      borderRadius: BorderRadius.lg,
      padding: Spacing.xl,
      alignItems: 'center',
    },
    supportIcon: {
      marginBottom: Spacing.lg,
    },
    supportTitle: {
      fontSize: FontSize.xl,
      fontWeight: 'bold',
      color: Colors.text.primary,
      textAlign: 'center',
      marginBottom: Spacing.md,
    },
    supportText: {
      fontSize: FontSize.md,
      color: Colors.text.secondary,
      textAlign: 'center',
      lineHeight: FontSize.md * 1.4,
      marginBottom: Spacing.xl,
    },
    supportActions: {
      flexDirection: screen.isTablet ? 'row' : 'column',
      gap: Spacing.md,
      width: '100%',
    },
    supportButton: {
      flex: screen.isTablet ? 1 : undefined,
    },
  });

  if (showSupportQuestion) {
    return (
      <View style={styles.supportOverlay}>
        <View style={styles.supportCard}>
          <View style={styles.supportIcon}>
            <Ionicons name="heart" size={60} color={Colors.status.error} />
          </View>
          
          <Text style={styles.supportTitle}>
            {t('health.support.title')}
          </Text>
          
          <Text style={styles.supportText}>
            {t('health.support.subtitle')}
          </Text>
          
          <View style={styles.supportActions}>
            <Button
              title={t('health.support.yes')}
              onPress={handleSupportYes}
              size="lg"
              style={styles.supportButton}
            />
            
            <Button
              title={t('health.support.no')}
              onPress={handleSupportNo}
              variant="outline"
              size="lg"
              style={styles.supportButton}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Apple Health</Text>
          <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>{t('health.skip')}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.healthIcon}>
              <Ionicons name="heart" size={50} color="white" />
            </View>
            
            <Text style={styles.title}>
              {t('health.title')}
            </Text>
            
            <Text style={styles.subtitle}>
              {t('health.subtitle')}
            </Text>
          </View>

          {/* Permissions Section */}
          <View style={styles.permissionsSection}>
            <Text style={styles.sectionTitle}>
              {t('health.permissionsTitle')}
            </Text>
            
            <View style={styles.permissionsList}>
              {healthDataTypes.map((item) => (
                <View key={item.id} style={styles.permissionItem}>
                  <View style={[
                    styles.permissionIcon,
                    { backgroundColor: `${item.color}15` }
                  ]}>
                    <Ionicons 
                      name={item.icon as any} 
                      size={24} 
                      color={item.color} 
                    />
                  </View>
                  
                  <View style={styles.permissionContent}>
                    <Text style={styles.permissionTitle}>{t(item.titleKey)}</Text>
                    <Text style={styles.permissionDescription}>
                      {t(item.descriptionKey)}
                    </Text>
                  </View>
                  
                  <View style={styles.permissionStatus}>
                    <Ionicons 
                      name={item.enabled ? "checkmark-circle" : "information-circle"} 
                      size={20} 
                      color={item.enabled ? Colors.status.success : Colors.text.muted} 
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Benefits Section */}
          <View style={styles.benefitsSection}>
            <Text style={styles.sectionTitle}>{t('health.benefitsTitle')}</Text>
            
            <View style={styles.benefitItem}>
              <Ionicons 
                name="trending-up" 
                size={20} 
                color={Colors.status.success}
                style={styles.benefitIcon}
              />
              <Text style={styles.benefitText}>
                {t('health.benefits.accuracy')}
              </Text>
            </View>
            
            <View style={styles.benefitItem}>
              <Ionicons 
                name="sync" 
                size={20} 
                color={Colors.primary[500]}
                style={styles.benefitIcon}
              />
              <Text style={styles.benefitText}>
                {t('health.benefits.sync')}
              </Text>
            </View>
            
            <View style={styles.benefitItem}>
              <Ionicons 
                name="analytics" 
                size={20} 
                color={Colors.secondary[500]}
                style={styles.benefitIcon}
              />
              <Text style={styles.benefitText}>
                {t('health.benefits.insights')}
              </Text>
            </View>
          </View>

          {/* Privacy Section */}
          <View style={styles.privacySection}>
            <Text style={styles.privacyTitle}>
              {t('health.privacyTitle')}
            </Text>
            <Text style={styles.privacyText}>
              {t('health.privacyText')}
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actionsSection}>
            <Button
              title={isConnecting ? t('health.connecting') : t('health.connect')}
              onPress={handleConnectHealth}
              fullWidth
              size="lg"
              disabled={isConnecting}
              style={styles.connectButton}
            />
            
            <Button
              title={t('health.notNow')}
              onPress={onSkip}
              variant="outline"
              fullWidth
              size="lg"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
} 