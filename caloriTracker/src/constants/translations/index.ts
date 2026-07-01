import { en } from './en';
import { tr } from './tr';

export type TranslationKey = keyof typeof tr;
export type NestedTranslationKey<T> = T extends object 
  ? { [K in keyof T]: `${string & K}${T[K] extends object ? `.${NestedTranslationKey<T[K]>}` : ''}` }[keyof T]
  : never;

export type SupportedLocale = 'tr' | 'en';

export const translations = {
  tr,
  en,
} as const;

export const supportedLocales: SupportedLocale[] = ['tr', 'en'];

export const localeNames = {
  tr: 'Türkçe',
  en: 'English',
} as const;

// Helper function to get nested value from object using dot notation
export function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Helper function to check if a key exists in translations
export function hasTranslation(locale: SupportedLocale, key: string): boolean {
  const translation = getNestedValue(translations[locale], key);
  return translation !== undefined && translation !== null;
} 