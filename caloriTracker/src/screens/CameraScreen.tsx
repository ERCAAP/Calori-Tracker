import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useI18n } from '../hooks/useI18n';
import calorieStorageService from '../services/calorieStorageService';
import openaiService from '../services/openaiService';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisModalVisible, setAnalysisModalVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const { t } = useI18n();

  const toggleCameraFacing = useCallback(() => {
    setFacing(current => current === 'back' ? 'front' : 'back');
  }, []);

  const takePicture = useCallback(async () => {
    if (!cameraRef.current) return;

    try {
      setIsAnalyzing(true);
      
      // Take photo
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        exif: false,
      });

      if (!photo?.uri) {
        throw new Error('Failed to capture photo');
      }

      setCapturedImage(photo.uri);
      setAnalysisModalVisible(true);

      // Quick food validation first
      const isFood = await openaiService.isFoodImage(photo.uri);
      
      if (!isFood) {
        Alert.alert(
          t('not_food_title'),
          t('not_food_message'),
          [
            { text: t('try_again'), onPress: () => setAnalysisModalVisible(false) },
            { text: t('continue_anyway'), onPress: () => analyzeFood(photo.uri) }
          ]
        );
        setIsAnalyzing(false);
        return;
      }

      // Analyze food with AI
      await analyzeFood(photo.uri);

    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert(
        t('error'),
        t('camera_error_message'),
        [{ text: t('ok'), onPress: () => setAnalysisModalVisible(false) }]
      );
      setIsAnalyzing(false);
    }
  }, [t]);

  const analyzeFood = async (imageUri: string) => {
    try {
      setIsAnalyzing(true);

      // Call OpenAI GPT-4 Omni through Firebase Functions
      const analysisResult = await openaiService.analyzeFoodImage(imageUri);

      // Add calories to calorie storage service
      await calorieStorageService.addCaloriesFromAnalysis(
        analysisResult.foodName,
        analysisResult.nutrition.calories,
        analysisResult
      );

      // Show success message with progress update
      const progress = await calorieStorageService.getProgress();
      
      Alert.alert(
        '🎉 Yemek Eklendi!',
        `${analysisResult.foodName}\n${analysisResult.nutrition.calories} kalori eklendi\n\nGünlük İlerleme: %${Math.round(progress.percentage)}\nKalan: ${progress.remaining} kalori`,
        [
          { 
            text: 'Tamam', 
            onPress: () => {
              setAnalysisModalVisible(false);
              router.back();
            }
          }
        ]
      );

    } catch (error) {
      console.error('Error analyzing food:', error);
      
      Alert.alert(
        t('analysis_error_title'),
        error instanceof Error ? error.message : t('analysis_error_message'),
        [
          { 
            text: t('retry'), 
            onPress: () => analyzeFood(imageUri) 
          },
          { 
            text: t('enter_manually'), 
            onPress: () => {
              setAnalysisModalVisible(false);
              console.log('Navigate to manual food entry');
              router.back();
            }
          }
        ]
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const pickFromGallery = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          t('permission_required'),
          t('gallery_permission_message')
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setCapturedImage(imageUri);
        setAnalysisModalVisible(true);
        
        // Quick validation
        const isFood = await openaiService.isFoodImage(imageUri);
        
        if (!isFood) {
          Alert.alert(
            t('not_food_title'),
            t('not_food_message'),
            [
              { text: t('choose_another'), onPress: () => setAnalysisModalVisible(false) },
              { text: t('continue_anyway'), onPress: () => analyzeFood(imageUri) }
            ]
          );
          return;
        }

        await analyzeFood(imageUri);
      }
    } catch (error) {
      console.error('Error picking from gallery:', error);
      Alert.alert(t('error'), t('gallery_error_message'));
    }
  }, [t]);

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.permissionContainer}
        >
          <Ionicons name="camera-outline" size={80} color="#fff" />
          <Text style={styles.permissionTitle}>{t('camera_permission_title')}</Text>
          <Text style={styles.permissionMessage}>{t('camera_permission_message')}</Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>{t('grant_permission')}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Camera View */}
      <CameraView 
        style={styles.camera} 
        facing={facing}
        ref={cameraRef}
      >
        {/* Header */}
        <SafeAreaView style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('scan_food')}</Text>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse" size={24} color="#fff" />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Camera Overlay */}
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
          <Text style={styles.instructionText}>
            {t('camera_instruction')}
          </Text>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.galleryButton} onPress={pickFromGallery}>
            <Ionicons name="images" size={24} color="#fff" />
            <Text style={styles.controlButtonText}>{t('gallery')}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.captureButton} 
            onPress={takePicture}
            disabled={isAnalyzing}
          >
            <View style={styles.captureButtonInner}>
              {isAnalyzing ? (
                <ActivityIndicator size="small" color="#667eea" />
              ) : (
                <Ionicons name="camera" size={32} color="#667eea" />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.manualButton} onPress={() => { console.log('Manual food entry'); router.back(); }}>
            <Ionicons name="create" size={24} color="#fff" />
            <Text style={styles.controlButtonText}>{t('manual')}</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      {/* Analysis Modal */}
      <Modal
        visible={analysisModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAnalysisModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {capturedImage && (
              <Image source={{ uri: capturedImage }} style={styles.previewImage} />
            )}
            
            <View style={styles.analysisContainer}>
              <ActivityIndicator size="large" color="#667eea" />
              <Text style={styles.analysisTitle}>
                {t('analyzing_food')}
              </Text>
              <Text style={styles.analysisSubtitle}>
                🤖 AI analiz ediyor ve kalori verileriniz güncelleniyor...
              </Text>
            </View>

            {!isAnalyzing && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setAnalysisModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  flipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: width * 0.8,
    height: width * 0.8,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  instructionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 40,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  galleryButton: {
    alignItems: 'center',
  },
  manualButton: {
    alignItems: 'center',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  permissionMessage: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.9,
  },
  permissionButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
  },
  permissionButtonText: {
    color: '#667eea',
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    maxWidth: width * 0.9,
    width: '100%',
  },
  previewImage: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 15,
    marginBottom: 20,
  },
  analysisContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
  },
  analysisSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: '#667eea',
    fontWeight: '600',
  },
}); 