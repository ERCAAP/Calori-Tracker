import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../components';
import { Colors, FontSize, Spacing } from '../constants/Colors';
import { useI18n } from '../hooks/useI18n';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export default function WelcomeScreen({ onGetStarted, onSignIn }: WelcomeScreenProps) {
  const { t } = useI18n();
  const screen = useResponsiveScreen();

  const features = [
    {
      icon: 'camera-outline',
      title: t('welcome.features.aiAnalysis.title'),
      description: t('welcome.features.aiAnalysis.description'),
    },
    {
      icon: 'analytics-outline',
      title: t('welcome.features.smartTracking.title'),
      description: t('welcome.features.smartTracking.description'),
    },
    {
      icon: 'trophy-outline',
      title: t('welcome.features.goalFocused.title'),
      description: t('welcome.features.goalFocused.description'),
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: screen.getValue({
        small: Spacing.md,
        medium: Spacing.lg,
        large: Spacing.xl,
      }),
    },
    header: {
      alignItems: 'center',
      paddingTop: screen.getValue({
        small: Spacing.lg,
        medium: Spacing.xl,
        large: Spacing.xxl,
      }),
      paddingBottom: screen.getValue({
        small: Spacing.lg,
        medium: Spacing.xl,
        large: Spacing.xxl,
      }),
    },
    logoContainer: {
      marginBottom: Spacing.md,
    },
    logoGradient: {
      width: screen.getValue({
        small: 70,
        medium: 80,
        large: 100,
      }),
      height: screen.getValue({
        small: 70,
        medium: 80,
        large: 100,
      }),
      borderRadius: screen.getValue({
        small: 35,
        medium: 40,
        large: 50,
      }),
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: screen.getValue({
        small: FontSize['2xl'],
        medium: FontSize['3xl'],
        large: FontSize['4xl'],
      }),
      fontWeight: 'bold',
      color: Colors.text.primary,
      marginBottom: Spacing.xs,
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
    },
    heroSection: {
      paddingVertical: screen.getValue({
        small: Spacing.lg,
        medium: Spacing.xl,
        large: Spacing.xxl,
      }),
      alignItems: 'center',
    },
    heroTitle: {
      fontSize: screen.getValue({
        small: FontSize['3xl'],
        medium: FontSize['4xl'],
        large: FontSize['4xl'],
      }),
      fontWeight: 'bold',
      color: Colors.text.primary,
      textAlign: 'center',
      lineHeight: screen.getValue({
        small: FontSize['3xl'] * 1.2,
        medium: FontSize['4xl'] * 1.2,
        large: FontSize['4xl'] * 1.2,
      }),
      marginBottom: Spacing.md,
      paddingHorizontal: screen.isTablet ? Spacing.xxl : 0,
    },
    heroHighlight: {
      color: Colors.primary[500],
    },
    heroDescription: {
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
      paddingHorizontal: screen.getValue({
        small: Spacing.md,
        medium: Spacing.lg,
        large: Spacing.xl,
      }),
      maxWidth: screen.isTablet ? 600 : undefined,
    },
    featuresSection: {
      paddingVertical: screen.getValue({
        small: Spacing.lg,
        medium: Spacing.xl,
        large: Spacing.xxl,
      }),
      flexDirection: screen.isTablet ? 'row' : 'column',
      gap: Spacing.md,
    },
    featureCard: {
      marginBottom: screen.isTablet ? 0 : Spacing.md,
      flex: screen.isTablet ? 1 : undefined,
    },
    featureContent: {
      flexDirection: screen.isTablet ? 'column' : 'row',
      alignItems: screen.isTablet ? 'center' : 'center',
      textAlign: screen.isTablet ? 'center' : 'left',
    },
    featureIconContainer: {
      width: screen.getValue({
        small: 45,
        medium: 50,
        large: 60,
      }),
      height: screen.getValue({
        small: 45,
        medium: 50,
        large: 60,
      }),
      borderRadius: screen.getValue({
        small: 22.5,
        medium: 25,
        large: 30,
      }),
      backgroundColor: Colors.primary[50],
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: screen.isTablet ? 0 : Spacing.md,
      marginBottom: screen.isTablet ? Spacing.md : 0,
    },
    featureText: {
      flex: screen.isTablet ? undefined : 1,
      alignItems: screen.isTablet ? 'center' : 'flex-start',
    },
    featureTitle: {
      fontSize: screen.getValue({
        small: FontSize.md,
        medium: FontSize.lg,
        large: FontSize.xl,
      }),
      fontWeight: '600',
      color: Colors.text.primary,
      marginBottom: Spacing.xs,
      textAlign: screen.isTablet ? 'center' : 'left',
    },
    featureDescription: {
      fontSize: screen.getValue({
        small: FontSize.sm,
        medium: FontSize.md,
        large: FontSize.lg,
      }),
      color: Colors.text.secondary,
      lineHeight: screen.getValue({
        small: FontSize.sm * 1.4,
        medium: FontSize.md * 1.4,
        large: FontSize.lg * 1.4,
      }),
      textAlign: screen.isTablet ? 'center' : 'left',
    },
    statsSection: {
      paddingBottom: screen.getValue({
        small: Spacing.lg,
        medium: Spacing.xl,
        large: Spacing.xxl,
      }),
      alignItems: 'center',
    },
    statsCard: {
      padding: 0,
      overflow: 'hidden',
      maxWidth: screen.isTablet ? 500 : undefined,
      width: '100%',
    },
    statsGradient: {
      flexDirection: 'row',
      padding: screen.getValue({
        small: Spacing.lg,
        medium: Spacing.xl,
        large: Spacing.xxl,
      }),
    },
    statsContent: {
      flex: 1,
      alignItems: 'center',
    },
    statsDivider: {
      width: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      marginHorizontal: screen.getValue({
        small: Spacing.md,
        medium: Spacing.lg,
        large: Spacing.xl,
      }),
    },
    statsNumber: {
      fontSize: screen.getValue({
        small: FontSize['2xl'],
        medium: FontSize['3xl'],
        large: FontSize['4xl'],
      }),
      fontWeight: 'bold',
      color: Colors.text.inverse,
      marginBottom: Spacing.xs,
    },
    statsLabel: {
      fontSize: screen.getValue({
        small: FontSize.sm,
        medium: FontSize.md,
        large: FontSize.lg,
      }),
      color: Colors.text.inverse,
      textAlign: 'center',
    },
    footer: {
      padding: screen.getValue({
        small: Spacing.md,
        medium: Spacing.lg,
        large: Spacing.xl,
      }),
      paddingBottom: screen.getValue({
        small: Spacing.lg,
        medium: Spacing.xl,
        large: Spacing.xxl,
      }),
      maxWidth: screen.isTablet ? 400 : undefined,
      width: '100%',
      alignSelf: 'center',
    },
    primaryButton: {
      marginBottom: Spacing.md,
    },
    secondaryButton: {
      marginTop: Spacing.sm,
    },
  });

  return (
    <LinearGradient
      colors={['#FAFBFC', '#F7FAFC']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={Colors.primary.gradient as [string, string]}
                style={styles.logoGradient}
              >
                <Ionicons 
                  name="nutrition-outline" 
                  size={screen.getValue({
                    small: 32,
                    medium: 40,
                    large: 50,
                  })} 
                  color="white" 
                />
              </LinearGradient>
            </View>
            
            <Text style={styles.title}>{t('welcome.title')}</Text>
            <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>
          </View>

          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>
              {t('welcome.heroTitle').split('\\n').map((line, index, array) => (
                <React.Fragment key={index}>
                  {index === 1 ? (
                    <Text style={styles.heroHighlight}>{line}</Text>
                  ) : (
                    line
                  )}
                  {index < array.length - 1 && '\n'}
                </React.Fragment>
              ))}
            </Text>
            <Text style={styles.heroDescription}>
              {t('welcome.heroDescription')}
            </Text>
          </View>

          <View style={styles.featuresSection}>
            {features.map((feature, index) => (
              <Card key={index} style={styles.featureCard} variant="outlined">
                <View style={styles.featureContent}>
                  <View style={styles.featureIconContainer}>
                    <Ionicons 
                      name={feature.icon as any} 
                      size={screen.getValue({
                        small: 20,
                        medium: 24,
                        large: 28,
                      })} 
                      color={Colors.primary[500]} 
                    />
                  </View>
                  <View style={styles.featureText}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          <View style={styles.statsSection}>
            <Card style={styles.statsCard} variant="elevated">
              <LinearGradient
                colors={Colors.secondary.gradient as [string, string]}
                style={styles.statsGradient}
              >
                <View style={styles.statsContent}>
                  <Text style={styles.statsNumber}>2X</Text>
                  <Text style={styles.statsLabel}>{t('welcome.stats.fasterResults')}</Text>
                </View>
                <View style={styles.statsDivider} />
                <View style={styles.statsContent}>
                  <Text style={styles.statsNumber}>90%</Text>
                  <Text style={styles.statsLabel}>{t('welcome.stats.accuracy')}</Text>
                </View>
              </LinearGradient>
            </Card>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={t('welcome.getStarted')}
            onPress={onGetStarted}
            size="lg"
            fullWidth
            style={styles.primaryButton}
          />
          
          <Button
            title={t('welcome.signIn')}
            onPress={onSignIn}
            variant="ghost"
            size="md"
            fullWidth
            style={styles.secondaryButton}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
} 