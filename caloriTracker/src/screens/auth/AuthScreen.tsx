import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useAuthStore } from '../../hooks/useAuthStore';
import authService from '../../services/authService';

const { width, height } = Dimensions.get('window');

// SVG Icons (same as before)
const RobotIcon = ({ size = 24, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L13.09 8.26L22 7L20.74 13.09L22 14L13.09 15.74L12 22L10.91 15.74L2 17L3.26 10.91L2 10L10.91 8.26L12 2Z" fill={color} />
  </Svg>
);

const AppleIcon = ({ size = 24, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.17 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" fill={color} />
  </Svg>
);

const GoogleIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
    <Path d="M12 23C15.24 23 17.96 21.92 19.28 20.34L15.71 17.57C14.74 18.22 13.48 18.62 12 18.62C8.87 18.62 6.22 16.68 5.35 13.96H1.64V16.83C2.96 19.45 7.24 23 12 23Z" fill="#34A853"/>
    <Path d="M5.35 13.96C5.13 13.31 5 12.61 5 11.87C5 11.13 5.13 10.43 5.35 9.78V6.91H1.64C0.89 8.4 0.5 10.08 0.5 11.87C0.5 13.66 0.89 15.34 1.64 16.83L5.35 13.96Z" fill="#FBBC05"/>
    <Path d="M12 5.12C13.62 5.12 15.06 5.65 16.17 6.7L19.36 3.51C17.96 2.18 15.24 1.37 12 1.37C7.24 1.37 2.96 4.92 1.64 7.54L5.35 10.41C6.22 7.69 8.87 5.12 12 5.12Z" fill="#EA4335"/>
  </Svg>
);

const EmailIcon = ({ size = 24, color = "#6B7280" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill={color} />
  </Svg>
);

interface AuthScreenProps {}

export default function AuthScreen({}: AuthScreenProps) {
  const insets = useSafeAreaInsets();
  const { setUser, setProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  
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

  const handleAppleSignIn = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const isAvailable = await authService.isAppleAuthAvailable();
      
      if (!isAvailable) {
        Alert.alert('Bilgi', 'Apple Sign-In bu cihazda kullanılabilir değil.');
        return;
      }

      const user = await authService.signInWithApple();
      setUser(user);
      
      // Get user profile
      const profile = await authService.getUserProfile(user.uid);
      if (profile) {
        setProfile(profile);
      }
      
      router.replace('/onboarding/welcome');
    } catch (error: any) {
      console.error('Apple sign in error:', error);
      if (error.message !== 'Apple Sign-In was canceled') {
        Alert.alert('Hata', error.message || 'Apple ile giriş yapılamadı.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const user = await authService.signInWithGoogle();
      setUser(user);
      
      // Get user profile
      const profile = await authService.getUserProfile(user.uid);
      if (profile) {
        setProfile(profile);
      }
      
      router.replace('/onboarding/welcome');
    } catch (error: any) {
      console.error('Google sign in error:', error);
      Alert.alert('Bilgi', 'Google girişi henüz aktif değil. Yakında kullanıma sunulacak.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = () => {
    router.push('/auth/email');
  };

  const handleAnonymousSignIn = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const user = await authService.signInAnonymously();
      setUser(user);
      
      router.replace('/onboarding/welcome');
    } catch (error: any) {
      console.error('Anonymous sign in error:', error);
      Alert.alert('Hata', 'Misafir girişi yapılamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent />
      
      <View style={[styles.background, { paddingTop: insets.top }]}>
        {/* Decorative elements */}
        <View style={styles.decorativeElements}>
          <View style={[styles.decorativeCircle, styles.circle1]} />
          <View style={[styles.decorativeCircle, styles.circle2]} />
        </View>

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
                <RobotIcon size={40} color="#FFFFFF" />
              </LinearGradient>
            </View>
            
            <Text style={styles.appName}>Cal AI</Text>
            <Text style={styles.tagline}>Yapay Zeka Destekli Kalori Takibi</Text>
          </View>

          {/* Auth Methods */}
          <View style={styles.authSection}>
            <Text style={styles.authTitle}>Hesabınızı oluşturun</Text>
            <Text style={styles.authSubtitle}>
              Kişiselleştirilmiş kalori planınıza başlamak için giriş yapın
            </Text>

            <View style={styles.authButtons}>
              {/* Apple Sign In - iOS Only */}
              {Platform.OS === 'ios' && (
                <TouchableOpacity
                  style={[styles.appleButton, loading && styles.buttonDisabled]}
                  onPress={handleAppleSignIn}
                  disabled={loading}
                  activeOpacity={0.9}
                >
                  <AppleIcon size={20} color="#FFFFFF" />
                  <Text style={styles.appleButtonText}>Apple ile devam edin</Text>
                </TouchableOpacity>
              )}

              {/* Google Sign In */}
              <TouchableOpacity
                style={[styles.googleButton, loading && styles.buttonDisabled]}
                onPress={handleGoogleSignIn}
                disabled={loading}
                activeOpacity={0.9}
              >
                <GoogleIcon size={20} />
                <Text style={styles.googleButtonText}>Google ile devam edin</Text>
              </TouchableOpacity>

              {/* Email Sign In */}
              <TouchableOpacity
                style={[styles.emailButton, loading && styles.buttonDisabled]}
                onPress={handleEmailSignIn}
                disabled={loading}
                activeOpacity={0.9}
              >
                <EmailIcon size={20} color="#2D3748" />
                <Text style={styles.emailButtonText}>E-posta ile devam edin</Text>
              </TouchableOpacity>

              {/* Anonymous Sign In */}
              <TouchableOpacity
                style={[styles.anonymousButton, loading && styles.buttonDisabled]}
                onPress={handleAnonymousSignIn}
                disabled={loading}
                activeOpacity={0.9}
              >
                <Text style={styles.anonymousButtonText}>Misafir olarak devam et</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms */}
          <View style={styles.termsSection}>
            <Text style={styles.termsText}>
              Devam ederek{' '}
              <Text style={styles.termsLink}>Kullanım Şartları</Text>
              {' '}ve{' '}
              <Text style={styles.termsLink}>Gizlilik Politikası</Text>
              'nı kabul etmiş olursunuz.
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
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  decorativeElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: 'rgba(102, 126, 234, 0.03)',
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 200,
    height: 200,
    bottom: -50,
    left: -50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  appIconContainer: {
    marginBottom: 24,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2D3748',
    marginBottom: 8,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    fontWeight: '500',
  },
  authSection: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  authButtons: {
    gap: 16,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 12,
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F8FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 12,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  anonymousButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  anonymousButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9CA3AF',
    textDecorationLine: 'underline',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  termsSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  termsText: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#667eea',
    fontWeight: '600',
  },
}); 