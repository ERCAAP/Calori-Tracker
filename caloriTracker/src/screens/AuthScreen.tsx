import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Input } from '../components';
import { BorderRadius, Colors, FontSize, Spacing } from '../constants/Colors';
import { useAuthStore } from '../hooks/useAuthStore';
import authService from '../services/authService';

interface AuthScreenProps {
  onAuthSuccess: () => void;
  onBackToWelcome: () => void;
}

export default function AuthScreen({ onAuthSuccess, onBackToWelcome }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { setUser, setProfile } = useAuthStore();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = 'Ad Soyad gereklidir';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailAuth = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      let user;
      if (isSignUp) {
        user = await authService.signUpWithEmail(
          formData.email,
          formData.password,
          formData.name
        );
      } else {
        user = await authService.signInWithEmail(formData.email, formData.password);
      }

      setUser(user);
      if (user.uid) {
        const profile = await authService.getUserProfile(user.uid);
        setProfile(profile);
      }
      
      onAuthSuccess();
    } catch (error: any) {
      Alert.alert('Hata', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      // Google auth implementation will be added with hooks
      Alert.alert('Bilgi', 'Google girişi yakında aktif olacak');
    } catch (error: any) {
      Alert.alert('Hata', error.message);
    } finally {
      setLoading(false);
    }
  };

  const socialButtons = [
    {
      title: 'Google ile devam et',
      icon: 'logo-google',
      onPress: handleGoogleAuth,
      bgColor: '#4285F4',
    },
    {
      title: 'Apple ile devam et',
      icon: 'logo-apple',
      onPress: () => Alert.alert('Bilgi', 'Apple girişi yakında aktif olacak'),
      bgColor: '#000000',
    },
  ];

  return (
    <LinearGradient
      colors={['#FAFBFC', '#F7FAFC']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <TouchableOpacity 
                onPress={onBackToWelcome}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
              </TouchableOpacity>

              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={Colors.primary.gradient as [string, string]}
                  style={styles.logoGradient}
                >
                  <Ionicons name="nutrition-outline" size={32} color="white" />
                </LinearGradient>
              </View>

              <Text style={styles.title}>
                {isSignUp ? 'Hesap Oluştur' : 'Hoş Geldin'}
              </Text>
              <Text style={styles.subtitle}>
                {isSignUp 
                  ? 'Sağlıklı yaşam yolculuğuna başlamak için hesap oluştur'
                  : 'Hesabına giriş yap ve kaldığın yerden devam et'
                }
              </Text>
            </View>

            <Card style={styles.formCard}>
              <View style={styles.formContent}>
                {isSignUp && (
                  <Input
                    label="Ad Soyad"
                    placeholder="Adınızı ve soyadınızı giriniz"
                    value={formData.name}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                    error={errors.name}
                    leftIcon="person-outline"
                    autoCapitalize="words"
                  />
                )}

                <Input
                  label="E-posta"
                  placeholder="E-posta adresinizi giriniz"
                  value={formData.email}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                  error={errors.email}
                  leftIcon="mail-outline"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Input
                  label="Şifre"
                  placeholder="Şifrenizi giriniz"
                  value={formData.password}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                  error={errors.password}
                  leftIcon="lock-closed-outline"
                  secureTextEntry
                />

                {isSignUp && (
                  <Input
                    label="Şifre Tekrar"
                    placeholder="Şifrenizi tekrar giriniz"
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                    error={errors.confirmPassword}
                    leftIcon="lock-closed-outline"
                    secureTextEntry
                  />
                )}

                <Button
                  title={isSignUp ? 'Hesap Oluştur' : 'Giriş Yap'}
                  onPress={handleEmailAuth}
                  loading={loading}
                  fullWidth
                  size="lg"
                  style={styles.primaryButton}
                />

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>veya</Text>
                  <View style={styles.dividerLine} />
                </View>

                {socialButtons.map((button, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={button.onPress}
                    style={[styles.socialButton, { backgroundColor: button.bgColor }]}
                    disabled={loading}
                  >
                    <Ionicons 
                      name={button.icon as any} 
                      size={20} 
                      color="white" 
                      style={styles.socialIcon}
                    />
                    <Text style={styles.socialButtonText}>{button.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>

            <View style={styles.footer}>
              <TouchableOpacity 
                onPress={() => setIsSignUp(!isSignUp)}
                style={styles.switchButton}
              >
                <Text style={styles.switchText}>
                  {isSignUp ? 'Zaten hesabın var mı? ' : 'Hesabın yok mu? '}
                  <Text style={styles.switchLink}>
                    {isSignUp ? 'Giriş Yap' : 'Hesap Oluştur'}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
  },
  header: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: Spacing.md,
    padding: Spacing.sm,
  },
  logoContainer: {
    marginBottom: Spacing.lg,
  },
  logoGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSize['3xl'],
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: FontSize.md * 1.4,
    paddingHorizontal: Spacing.md,
  },
  formCard: {
    marginBottom: Spacing.xl,
  },
  formContent: {
    gap: Spacing.sm,
  },
  primaryButton: {
    marginTop: Spacing.md,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border.light,
  },
  dividerText: {
    fontSize: FontSize.sm,
    color: Colors.text.muted,
    paddingHorizontal: Spacing.md,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  socialIcon: {
    marginRight: Spacing.sm,
  },
  socialButtonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: 'white',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: Spacing.xl,
  },
  switchButton: {
    padding: Spacing.md,
  },
  switchText: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  switchLink: {
    color: Colors.primary[500],
    fontWeight: '600',
  },
}); 