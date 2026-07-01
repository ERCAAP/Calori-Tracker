import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Modern Icons
const CameraIcon = ({ size = 32, color = "#667eea" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 4H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Circle cx="12" cy="13" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const TargetIcon = ({ size = 32, color = "#667eea" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <Circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2"/>
    <Circle cx="12" cy="12" r="2" stroke={color} strokeWidth="2"/>
  </Svg>
);

const ChartIcon = ({ size = 32, color = "#667eea" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 3V21H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M9 9L12 6L16 10L20 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const HeartIcon = ({ size = 32, color = "#667eea" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99858 7.05 2.99858C5.59096 2.99858 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54858 7.04096 1.54858 8.5C1.54858 9.95904 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.0621 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const RobotIcon = ({ size = 48, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L13.09 8.26L22 7L20.74 13.09L22 14L13.09 15.74L12 22L10.91 15.74L2 17L3.26 10.91L2 10L10.91 8.26L12 2Z" fill={color} />
  </Svg>
);

interface WelcomeScreenProps {}

export default function WelcomeScreen({}: WelcomeScreenProps) {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    router.push('/onboarding/personal-info');
  };

  const features = [
    {
      icon: <CameraIcon size={28} color="#667eea" />,
      title: "AI Fotoğraf",
      subtitle: "Anında analiz",
    },
    {
      icon: <TargetIcon size={28} color="#667eea" />,
      title: "Kişisel Plan", 
      subtitle: "Size özel",
    },
    {
      icon: <ChartIcon size={28} color="#667eea" />,
      title: "Akıllı Takip",
      subtitle: "Otomatik kayıt",
    },
    {
      icon: <HeartIcon size={28} color="#667eea" />,
      title: "Health Sync",
      subtitle: "Apple entegrasyonu",
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent />
      
      <View style={[styles.background, { paddingTop: insets.top }]}>
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              paddingBottom: insets.bottom + 20,
            }
          ]}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.appIconContainer}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.appIcon}
              >
                <RobotIcon size={32} color="#FFFFFF" />
              </LinearGradient>
            </View>
            
            <Text style={styles.appName}>Cal AI</Text>
            <Text style={styles.tagline}>Yapay Zeka Destekli Kalori Takibi</Text>
          </View>

          {/* Features Grid */}
          <View style={styles.featuresSection}>
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.featureCard,
                    {
                      opacity: fadeAnim,
                      transform: [{
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, (index + 1) * 10],
                        }),
                      }],
                    }
                  ]}
                >
                  <View style={styles.featureIconContainer}>
                    {feature.icon}
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Statistics */}
          <View style={styles.statsSection}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>92%</Text>
                <Text style={styles.statLabel}>Başarı Oranı</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>2x</Text>
                <Text style={styles.statLabel}>Hızlı Sonuç</Text>
              </View>
            </View>
            <Text style={styles.statsDescription}>
              AI destekli kişisel planınız ile hedeflerinize daha hızlı ulaşın
            </Text>
          </View>

          {/* Welcome Message */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Hoş Geldiniz! 👋</Text>
            <Text style={styles.welcomeSubtitle}>
              Size özel kalori planı oluşturmak için birkaç kısa soru soracağız
            </Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleGetStarted}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.startButtonGradient}
            >
              <Text style={styles.startButtonText}>Başlayalım 🚀</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Privacy Note */}
          <View style={styles.privacySection}>
            <Text style={styles.privacyText}>
              🔒 Verileriniz güvenle korunur ve sadece sizinle paylaşılır
            </Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  background: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  appIconContainer: {
    marginBottom: 20,
  },
  appIcon: {
    width: 72,
    height: 72,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2D3748',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 16,
    color: '#718096',
    fontWeight: '500',
  },
  featuresSection: {
    marginBottom: 40,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  featureCard: {
    width: (width - 64) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F3F4',
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#F7FAFC',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureSubtitle: {
    fontSize: 13,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 18,
  },
  statsSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 48,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: '#667eea',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '600',
  },
  statsDescription: {
    fontSize: 15,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2D3748',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  startButton: {
    marginBottom: 20,
  },
  startButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  privacySection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  privacyText: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
}); 