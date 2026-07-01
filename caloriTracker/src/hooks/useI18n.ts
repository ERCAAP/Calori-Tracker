import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import { useCallback, useEffect, useState } from 'react';
import {
    getNestedValue,
    hasTranslation,
    SupportedLocale,
    supportedLocales,
    translations
} from '../constants/translations';

const LOCALE_STORAGE_KEY = '@caloritracker:locale';

// Get device locale and fallback to supported locale
function getDeviceLocale(): SupportedLocale {
  const deviceLocales = getLocales();
  const deviceLocale = deviceLocales[0]?.languageCode;
  
  // Check if device locale is supported
  if (deviceLocale && supportedLocales.includes(deviceLocale as SupportedLocale)) {
    return deviceLocale as SupportedLocale;
  }
  
  // Fallback to English
  return 'en';
}

export function useI18n() {
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>('en');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize locale from storage or device
  useEffect(() => {
    const initializeLocale = async () => {
      try {
        const savedLocale = await AsyncStorage.getItem(LOCALE_STORAGE_KEY);
        
        if (savedLocale && supportedLocales.includes(savedLocale as SupportedLocale)) {
          setCurrentLocale(savedLocale as SupportedLocale);
        } else {
          const deviceLocale = getDeviceLocale();
          setCurrentLocale(deviceLocale);
          await AsyncStorage.setItem(LOCALE_STORAGE_KEY, deviceLocale);
        }
      } catch (error) {
        console.warn('Failed to load locale from storage:', error);
        setCurrentLocale(getDeviceLocale());
      } finally {
        setIsLoading(false);
      }
    };

    initializeLocale();
  }, []);

  // Change locale and save to storage
  const changeLocale = useCallback(async (newLocale: SupportedLocale) => {
    try {
      setCurrentLocale(newLocale);
      await AsyncStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    } catch (error) {
      console.warn('Failed to save locale to storage:', error);
    }
  }, []);

  // Get translation by key with fallback
  const t = useCallback((key: string, fallback?: string): string => {
    // Try current locale first
    let translation = getNestedValue(translations[currentLocale], key);
    
    // Fallback to English if not found and current locale is not English
    if (translation === undefined && currentLocale !== 'en') {
      translation = getNestedValue(translations.en, key);
    }
    
    // Return translation, fallback, or key as last resort
    if (translation !== undefined) {
      return String(translation);
    }
    
    if (fallback) {
      return fallback;
    }
    
    // Return the key itself as fallback (useful for development)
    return key;
  }, [currentLocale]);

  // Get translations for specific section
  const tSection = useCallback((section: string) => {
    const sectionTranslations = getNestedValue(translations[currentLocale], section);
    return sectionTranslations || {};
  }, [currentLocale]);

  // Check if key exists
  const hasKey = useCallback((key: string): boolean => {
    return hasTranslation(currentLocale, key);
  }, [currentLocale]);

  // Format text with variables
  const tf = useCallback((key: string, variables: Record<string, string | number> = {}, fallback?: string): string => {
    let text = t(key, fallback);
    
    // Replace variables in format {{variableName}}
    Object.entries(variables).forEach(([varName, value]) => {
      const placeholder = `{{${varName}}}`;
      text = text.replace(new RegExp(placeholder, 'g'), String(value));
    });
    
    return text;
  }, [t]);

  // Get current locale info
  const localeInfo = {
    code: currentLocale,
    name: currentLocale === 'tr' ? 'Türkçe' : 'English',
    isRTL: false, // Neither Turkish nor English is RTL
  };

  return {
    // Current state
    currentLocale,
    isLoading,
    localeInfo,
    
    // Translation functions
    t,
    tf,
    tSection,
    hasKey,
    
    // Locale management
    changeLocale,
    supportedLocales,
    
    // Utility
    isLocaleSupported: (locale: string): locale is SupportedLocale => 
      supportedLocales.includes(locale as SupportedLocale),
  };
}

// Create a simple hook for just translation function
export function useTranslation() {
  const { t, tf } = useI18n();
  return { t, tf };
} 