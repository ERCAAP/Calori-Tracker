import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Card, Input } from '../../components';
import ProgressIndicator from '../../components/ProgressIndicator';
import { useOnboarding } from '../../contexts/OnboardingContext';

const { width, height } = Dimensions.get('window');

interface PersonalInfoData {
  name: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  height: number;
  currentWeight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

export default function PersonalInfoScreen() {
  const insets = useSafeAreaInsets();
  const { data, updatePersonalInfo, completeStep, goToStep } = useOnboarding();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  
  const [formData, setFormData] = useState<PersonalInfoData>({
    name: data.personalInfo.name || '',
    dateOfBirth: data.personalInfo.dateOfBirth || new Date(1990, 0, 1),
    gender: data.personalInfo.gender || 'male',
    height: data.personalInfo.height || 170,
    currentWeight: data.personalInfo.currentWeight || 70,
    activityLevel: data.personalInfo.activityLevel || 'moderate',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

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

  const genderOptions = [
    { value: 'male', label: 'Erkek', icon: 'man-outline' },
    { value: 'female', label: 'Kadın', icon: 'woman-outline' },
    { value: 'other', label: 'Diğer', icon: 'person-outline' },
  ];

  const activityLevels = [
    {
      value: 'sedentary',
      title: 'Hareketsiz',
      description: 'Masabaşı iş, çok az aktivite',
      icon: 'bed-outline',
      color: '#9CA3AF',
    },
    {
      value: 'light',
      title: 'Az Aktif',
      description: 'Hafif egzersiz, haftada 1-3 gün',
      icon: 'walk-outline',
      color: '#F59E0B',
    },
    {
      value: 'moderate',
      title: 'Orta Aktif',
      description: 'Orta seviye egzersiz, haftada 3-5 gün',
      icon: 'bicycle-outline',
      color: '#10B981',
    },
    {
      value: 'active',
      title: 'Aktif',
      description: 'Yoğun egzersiz, haftada 6-7 gün',
      icon: 'fitness-outline',
      color: '#3B82F6',
    },
    {
      value: 'very_active',
      title: 'Çok Aktif',
      description: 'Günde 2 kez egzersiz veya fiziksel iş',
      icon: 'barbell-outline',
      color: '#8B5CF6',
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'İsim gereklidir';
    }

    if (formData.height < 100 || formData.height > 250) {
      newErrors.height = 'Boy 100-250 cm arasında olmalıdır';
    }

    if (formData.currentWeight < 30 || formData.currentWeight > 300) {
      newErrors.currentWeight = 'Kilo 30-300 kg arasında olmalıdır';
    }

    const age = new Date().getFullYear() - formData.dateOfBirth.getFullYear();
    if (age < 13 || age > 100) {
      newErrors.dateOfBirth = 'Yaş 13-100 arasında olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Update onboarding data
      updatePersonalInfo(formData);
      
      // Complete this step
      completeStep('personal-info');
      
      // Navigate to goals screen
      router.push('/onboarding/goals');
    } catch (error) {
      Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFormData(prev => ({ ...prev, dateOfBirth: selectedDate }));
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <ProgressIndicator
        currentStep={2}
        totalSteps={5}
        stepTitle="Kişisel Bilgiler"
      />

      <LinearGradient
        colors={['#FFFFFF', '#F7F8FA']}
        style={styles.background}
      >
        <View style={[styles.content, { paddingTop: 0, paddingBottom: insets.bottom + 20 }]}>
          {/* Header */}
          <Animated.View 
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#1F2937" />
            </TouchableOpacity>
            
            <View style={styles.headerContent}>
              <Text style={styles.title}>Seni Tanıyalım</Text>
              <Text style={styles.subtitle}>
                Kişiselleştirilmiş deneyim için temel bilgilerini paylaş
              </Text>
            </View>
          </Animated.View>

          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={[
                styles.form,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }
              ]}
            >
              {/* Name Input */}
              <Card style={styles.inputCard}>
                <Input
                  label="Ad Soyad"
                  value={formData.name}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                  placeholder="Adınızı ve soyadınızı girin"
                  error={errors.name}
                  icon={<Ionicons name="person-outline" size={20} color="#6B7280" />}
                />
              </Card>

              {/* Date of Birth */}
              <Card style={styles.inputCard}>
                <Text style={styles.inputLabel}>Doğum Tarihi</Text>
                <TouchableOpacity
                  style={[styles.dateButton, errors.dateOfBirth && styles.dateButtonError]}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                  <Text style={styles.dateButtonText}>
                    {formatDate(formData.dateOfBirth)}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                </TouchableOpacity>
                {errors.dateOfBirth && (
                  <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
                )}
              </Card>

              {/* Gender Selection */}
              <Card style={styles.inputCard}>
                <Text style={styles.inputLabel}>Cinsiyet</Text>
                <View style={styles.genderContainer}>
                  {genderOptions.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.genderOption,
                        formData.gender === option.value && styles.genderOptionActive,
                      ]}
                      onPress={() => setFormData(prev => ({ ...prev, gender: option.value as any }))}
                    >
                      <Ionicons
                        name={option.icon as any}
                        size={24}
                        color={formData.gender === option.value ? '#FF6B35' : '#6B7280'}
                      />
                      <Text
                        style={[
                          styles.genderOptionText,
                          formData.gender === option.value && styles.genderOptionTextActive,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Card>

              {/* Height and Weight */}
              <View style={styles.inputRow}>
                <Card style={[styles.inputCard, styles.halfWidth]}>
                  <Input
                    label="Boy (cm)"
                    value={formData.height.toString()}
                    onChangeText={(text) => setFormData(prev => ({ 
                      ...prev, 
                      height: parseInt(text) || 0 
                    }))}
                    placeholder="170"
                    keyboardType="numeric"
                    error={errors.height}
                    icon={<Ionicons name="resize-outline" size={20} color="#6B7280" />}
                  />
                </Card>

                <Card style={[styles.inputCard, styles.halfWidth]}>
                  <Input
                    label="Kilo (kg)"
                    value={formData.currentWeight.toString()}
                    onChangeText={(text) => setFormData(prev => ({ 
                      ...prev, 
                      currentWeight: parseInt(text) || 0 
                    }))}
                    placeholder="70"
                    keyboardType="numeric"
                    error={errors.currentWeight}
                    icon={<Ionicons name="scale-outline" size={20} color="#6B7280" />}
                  />
                </Card>
              </View>

              {/* Activity Level */}
              <Card style={styles.inputCard}>
                <Text style={styles.inputLabel}>Aktivite Seviyesi</Text>
                <Text style={styles.inputSubLabel}>
                  Günlük aktivite seviyenizi seçiniz
                </Text>
                <View style={styles.activityContainer}>
                  {activityLevels.map((level) => (
                    <TouchableOpacity
                      key={level.value}
                      style={[
                        styles.activityOption,
                        formData.activityLevel === level.value && styles.activityOptionActive,
                      ]}
                      onPress={() => setFormData(prev => ({ 
                        ...prev, 
                        activityLevel: level.value as any 
                      }))}
                    >
                      <View style={[
                        styles.activityIcon,
                        { backgroundColor: `${level.color}15` },
                        formData.activityLevel === level.value && { backgroundColor: `${level.color}25` }
                      ]}>
                        <Ionicons
                          name={level.icon as any}
                          size={24}
                          color={formData.activityLevel === level.value ? level.color : '#6B7280'}
                        />
                      </View>
                      <View style={styles.activityContent}>
                        <Text
                          style={[
                            styles.activityTitle,
                            formData.activityLevel === level.value && styles.activityTitleActive,
                          ]}
                        >
                          {level.title}
                        </Text>
                        <Text style={styles.activityDescription}>
                          {level.description}
                        </Text>
                      </View>
                      {formData.activityLevel === level.value && (
                        <Ionicons name="checkmark-circle" size={24} color={level.color} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </Card>
            </Animated.View>
          </ScrollView>

          {/* Continue Button */}
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: fadeAnim,
              }
            ]}
          >
            <Button
              title="Devam Et"
              onPress={handleNext}
              loading={loading}
              fullWidth
              size="lg"
            />
          </Animated.View>
        </View>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={formData.dateOfBirth}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
            minimumDate={new Date(1920, 0, 1)}
          />
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingVertical: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F7F8FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    paddingBottom: 20,
  },
  inputCard: {
    marginBottom: 20,
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  inputSubLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  dateButtonError: {
    borderColor: '#EF4444',
  },
  dateButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 8,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderOption: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F7F8FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    gap: 8,
  },
  genderOptionActive: {
    backgroundColor: '#FF6B3510',
    borderColor: '#FF6B35',
  },
  genderOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  genderOptionTextActive: {
    color: '#FF6B35',
  },
  activityContainer: {
    gap: 12,
  },
  activityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F7F8FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    gap: 16,
  },
  activityOptionActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF6B35',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  activityTitleActive: {
    color: '#FF6B35',
  },
  activityDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  buttonContainer: {
    paddingTop: 20,
  },
}); 