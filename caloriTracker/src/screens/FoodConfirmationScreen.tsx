import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Input } from '../components';
import { BorderRadius, Colors, FontSize, Spacing } from '../constants/Colors';
import { useI18n } from '../hooks/useI18n';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';

interface FoodAnalysisResult {
  foodName: string;
  confidence: number;
  description: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
    servingSize: string;
  };
  tags: string[];
  isFood: boolean;
  portion: {
    estimated: string;
    weight: number;
  };
}

interface FoodConfirmationScreenProps {
  onBack: () => void;
  onConfirm: (foodData: FoodAnalysisResult) => void;
  onReject: () => void;
  analysisResult: FoodAnalysisResult;
  imageUri: string;
}

export default function FoodConfirmationScreen({
  onBack,
  onConfirm,
  onReject,
  analysisResult,
  imageUri,
}: FoodConfirmationScreenProps) {
  const { t } = useI18n();
  const screen = useResponsiveScreen();

  const [editedFood, setEditedFood] = useState<FoodAnalysisResult>(analysisResult);
  const [isEditing, setIsEditing] = useState(false);

  const nutritionItems = [
    { 
      key: 'calories', 
      label: 'Kalori', 
      value: editedFood.nutrition.calories, 
      unit: 'kcal',
      color: Colors.primary[500],
      icon: 'flame-outline'
    },
    { 
      key: 'protein', 
      label: t('home.macros.protein'), 
      value: editedFood.nutrition.protein, 
      unit: 'g',
      color: Colors.status.success,
      icon: 'fitness-outline'
    },
    { 
      key: 'carbs', 
      label: t('home.macros.carbs'), 
      value: editedFood.nutrition.carbs, 
      unit: 'g',
      color: Colors.status.warning,
      icon: 'leaf-outline'
    },
    { 
      key: 'fat', 
      label: t('home.macros.fat'), 
      value: editedFood.nutrition.fat, 
      unit: 'g',
      color: Colors.status.error,
      icon: 'water-outline'
    },
  ];

  const handleNutritionEdit = (key: keyof FoodAnalysisResult['nutrition'], value: string) => {
    const numericValue = parseFloat(value) || 0;
    setEditedFood(prev => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        [key]: numericValue,
      },
    }));
  };

  const handleConfirm = () => {
    onConfirm(editedFood);
  };

  const handleReanalyze = () => {
    Alert.alert(
      'Tekrar Analiz Et',
      'Fotoğrafı tekrar analiz etmek istiyor musunuz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Evet', onPress: onReject },
      ]
    );
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return Colors.status.success;
    if (confidence >= 0.6) return Colors.status.warning;
    return Colors.status.error;
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return 'Yüksek Güven';
    if (confidence >= 0.6) return 'Orta Güven';
    return 'Düşük Güven';
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
      backgroundColor: Colors.background.primary,
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
    editButton: {
      padding: Spacing.sm,
    },
    content: {
      flex: 1,
      paddingHorizontal: screen.getValue({
        small: Spacing.md,
        medium: Spacing.lg,
        large: Spacing.xl,
      }),
    },
    imageSection: {
      marginBottom: Spacing.lg,
    },
    foodImage: {
      width: '100%',
      height: screen.getValue({
        small: 200,
        medium: 250,
        large: 300,
      }),
      borderRadius: BorderRadius.lg,
    },
    confidenceOverlay: {
      position: 'absolute',
      top: Spacing.md,
      right: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.md,
    },
    confidenceText: {
      color: 'white',
      fontSize: FontSize.sm,
      fontWeight: '600',
      marginLeft: Spacing.xs,
    },
    foodInfoSection: {
      marginBottom: Spacing.lg,
    },
    foodName: {
      fontSize: screen.getValue({
        small: FontSize.xl,
        medium: FontSize['2xl'],
        large: FontSize['3xl'],
      }),
      fontWeight: 'bold',
      color: Colors.text.primary,
      marginBottom: Spacing.sm,
      textAlign: 'center',
    },
    foodDescription: {
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
      marginBottom: Spacing.md,
    },
    portionInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.primary[50],
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderRadius: BorderRadius.md,
    },
    portionText: {
      fontSize: FontSize.md,
      fontWeight: '600',
      color: Colors.primary[500],
      marginLeft: Spacing.sm,
    },
    nutritionSection: {
      marginBottom: Spacing.lg,
    },
    sectionTitle: {
      fontSize: FontSize.lg,
      fontWeight: 'bold',
      color: Colors.text.primary,
      marginBottom: Spacing.md,
    },
    nutritionGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
    },
    nutritionItem: {
      flex: screen.isTablet ? 0.23 : 0.48,
      padding: Spacing.md,
      borderRadius: BorderRadius.md,
      backgroundColor: Colors.background.secondary,
      borderWidth: 1,
      borderColor: Colors.border.light,
      alignItems: 'center',
    },
    nutritionIcon: {
      marginBottom: Spacing.sm,
    },
    nutritionValue: {
      fontSize: FontSize.lg,
      fontWeight: 'bold',
      color: Colors.text.primary,
      marginBottom: Spacing.xs,
    },
    nutritionLabel: {
      fontSize: FontSize.sm,
      color: Colors.text.secondary,
      textAlign: 'center',
    },
    editSection: {
      marginBottom: Spacing.lg,
    },
    editGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
    },
    editItem: {
      flex: screen.isTablet ? 0.48 : 1,
    },
    tagsSection: {
      marginBottom: Spacing.lg,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
    },
    tag: {
      backgroundColor: Colors.primary[100],
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.sm,
    },
    tagText: {
      fontSize: FontSize.sm,
      color: Colors.primary[500],
      fontWeight: '600',
    },
    actionsSection: {
      flexDirection: screen.isTablet ? 'row' : 'column',
      gap: Spacing.md,
      paddingBottom: Spacing.xl,
    },
    actionButton: {
      flex: screen.isTablet ? 1 : undefined,
    },
    rejectButton: {
      backgroundColor: Colors.status.error,
    },
    reanalyzeButton: {
      backgroundColor: Colors.status.warning,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('food.confirmFood')}</Text>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => setIsEditing(!isEditing)}
          >
            <Ionicons 
              name={isEditing ? "checkmark" : "create"} 
              size={24} 
              color={Colors.primary[500]} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Food Image */}
          <Card style={styles.imageSection}>
            <Image source={{ uri: imageUri }} style={styles.foodImage} />
            <View style={styles.confidenceOverlay}>
              <Ionicons 
                name="checkmark-circle" 
                size={16} 
                color={getConfidenceColor(editedFood.confidence)} 
              />
              <Text style={styles.confidenceText}>
                {getConfidenceText(editedFood.confidence)} ({Math.round(editedFood.confidence * 100)}%)
              </Text>
            </View>
          </Card>

          {/* Food Information */}
          <Card style={styles.foodInfoSection}>
            {isEditing ? (
              <Input
                label="Yemek Adı"
                value={editedFood.foodName}
                onChangeText={(text) => setEditedFood(prev => ({ ...prev, foodName: text }))}
              />
            ) : (
              <Text style={styles.foodName}>{editedFood.foodName}</Text>
            )}
            
            <Text style={styles.foodDescription}>{editedFood.description}</Text>
            
            <View style={styles.portionInfo}>
              <Ionicons name="scale-outline" size={20} color={Colors.primary[500]} />
              <Text style={styles.portionText}>
                {editedFood.portion.estimated} (~{editedFood.portion.weight}g)
              </Text>
            </View>
          </Card>

          {/* Nutrition Information */}
          <Card style={styles.nutritionSection}>
            <Text style={styles.sectionTitle}>{t('food.nutritionFacts')}</Text>
            
            {isEditing ? (
              <View style={styles.editGrid}>
                {nutritionItems.map((item) => (
                  <View key={item.key} style={styles.editItem}>
                                         <Input
                       label={item.label}
                       value={item.value.toString()}
                       onChangeText={(text) => handleNutritionEdit(item.key as any, text)}
                       keyboardType="numeric"
                       placeholder={`0 ${item.unit}`}
                     />
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.nutritionGrid}>
                {nutritionItems.map((item) => (
                  <View key={item.key} style={styles.nutritionItem}>
                    <Ionicons 
                      name={item.icon as any} 
                      size={24} 
                      color={item.color}
                      style={styles.nutritionIcon}
                    />
                    <Text style={styles.nutritionValue}>
                      {item.value} {item.unit}
                    </Text>
                    <Text style={styles.nutritionLabel}>{item.label}</Text>
                  </View>
                ))}
              </View>
            )}
          </Card>

          {/* Tags */}
          {editedFood.tags.length > 0 && (
            <Card style={styles.tagsSection}>
              <Text style={styles.sectionTitle}>Etiketler</Text>
              <View style={styles.tagsContainer}>
                {editedFood.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </Card>
          )}

          {/* Action Buttons */}
          <View style={styles.actionsSection}>
            <Button
              title="Bilgiler Doğru"
              onPress={handleConfirm}
              fullWidth
              size="lg"
              style={styles.actionButton}
            />
            
                         <Button
               title="Tekrar Analiz Et"
               onPress={handleReanalyze}
               variant="outline"
               fullWidth
               size="lg"
               style={styles.actionButton}
             />
             
             <Button
               title="Yanlış Yemek"
               onPress={onReject}
               variant="outline"
               fullWidth
               size="lg"
               style={styles.actionButton}
             />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
} 