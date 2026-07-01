# Responsive Design & i18n Usage Examples

Bu dosya CaloriTracker uygulamasında responsive tasarım ve i18n localization özelliklerinin nasıl kullanılacağını gösterir.

## 🎨 Responsive Design

### 1. useResponsiveScreen Hook'u

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';

export default function ResponsiveComponent() {
  const screen = useResponsiveScreen();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: screen.fonts.xl }]}>
        Current breakpoint: {screen.breakpoint}
      </Text>
      
      {screen.isTablet && (
        <Text>Tablet görünümü aktif</Text>
      )}
      
      {screen.isPhone && (
        <Text>Telefon görünümü aktif</Text>
      )}
    </View>
  );
}
```

### 2. Responsive Values ile Styling

```tsx
const styles = StyleSheet.create({
  container: {
    padding: screen.getValue({
      small: 16,
      medium: 24,
      large: 32,
      xlarge: 48,
    }),
    flexDirection: screen.isTablet ? 'row' : 'column',
  },
  
  title: {
    fontSize: screen.getValue({
      small: 18,
      medium: 24,
      large: 32,
    }),
    textAlign: screen.isTablet ? 'left' : 'center',
  },
  
  card: {
    width: screen.getValue({
      small: '100%',
      medium: '48%',
      large: '32%',
    }),
    marginBottom: screen.spacing.md,
  },
});
```

### 3. Utility Functions

```tsx
import { wp, hp, rf, rs } from '../utils/responsive';

const styles = StyleSheet.create({
  fullWidthButton: {
    width: wp(90), // 90% of screen width
    height: hp(6),  // 6% of screen height
    fontSize: rf(16), // Responsive font size
    borderRadius: rs(8), // Responsive border radius
  },
});
```

### 4. Breakpoint Checks

```tsx
import { isBreakpointUp, isTablet, getCurrentBreakpoint } from '../utils/responsive';

// Component içinde
const shouldShowSidebar = isBreakpointUp('large');
const isTabletDevice = isTablet();
const currentBp = getCurrentBreakpoint();

return (
  <View style={{ flexDirection: shouldShowSidebar ? 'row' : 'column' }}>
    {shouldShowSidebar && <Sidebar />}
    <MainContent />
  </View>
);
```

## 🌐 i18n Localization

### 1. useI18n Hook'u - Tam Özellikli

```tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useI18n } from '../hooks/useI18n';

export default function LocalizedComponent() {
  const { t, tf, currentLocale, changeLocale, localeInfo } = useI18n();

  const handleLanguageChange = () => {
    const newLocale = currentLocale === 'tr' ? 'en' : 'tr';
    changeLocale(newLocale);
  };

  return (
    <View>
      <Text>{t('welcome.title')}</Text>
      <Text>{t('welcome.subtitle')}</Text>
      
      {/* Variables ile çeviri */}
      <Text>
        {tf('home.greeting', { name: 'John' })} {/* "Merhaba John" */}
      </Text>
      
      {/* Fallback ile */}
      <Text>{t('some.missing.key', 'Default text')}</Text>
      
      {/* Mevcut dil bilgisi */}
      <Text>Current language: {localeInfo.name}</Text>
      
      <Button
        title={`Switch to ${currentLocale === 'tr' ? 'English' : 'Türkçe'}`}
        onPress={handleLanguageChange}
      />
    </View>
  );
}
```

### 2. useTranslation Hook'u - Basit Kullanım

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from '../hooks/useI18n';

export default function SimpleLocalizedComponent() {
  const { t, tf } = useTranslation();

  return (
    <View>
      <Text>{t('auth.signIn')}</Text>
      <Text>{t('auth.email')}</Text>
      <Text>{tf('errors.pleaseCompleteForm')}</Text>
    </View>
  );
}
```

### 3. Çeviri Anahtarları

```tsx
// Basit anahtar
t('common.save') // -> "Kaydet" (TR) | "Save" (EN)

// Nested anahtar
t('welcome.features.aiAnalysis.title') // -> "AI Fotoğraf Analizi"

// Variables ile
tf('home.greeting', { name: 'Ali' }) // -> "Merhaba Ali"

// Section çevirisi
const authTexts = tSection('auth');
// authTexts.signIn, authTexts.email, etc.
```

### 4. Çeviri Dosyası Yapısı

```typescript
// src/constants/translations/tr.ts
export const tr = {
  common: {
    save: 'Kaydet',
    cancel: 'İptal',
  },
  auth: {
    signIn: 'Giriş Yap',
    email: 'E-posta',
    placeholders: {
      email: 'E-posta adresinizi giriniz',
    },
  },
  home: {
    greeting: 'Merhaba {{name}}', // Variable kullanımı
  },
};
```

## 🔥 Kombine Kullanım - Responsive & i18n

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import { useTranslation } from '../hooks/useI18n';
import { Button } from '../components';

export default function ResponsiveLocalizedCard() {
  const screen = useResponsiveScreen();
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      padding: screen.getValue({
        small: 16,
        medium: 20,
        large: 24,
      }),
      flexDirection: screen.isTablet ? 'row' : 'column',
      alignItems: screen.isTablet ? 'center' : 'stretch',
    },
    
    title: {
      fontSize: screen.getValue({
        small: screen.fonts.lg,
        medium: screen.fonts.xl,
        large: screen.fonts['2xl'],
      }),
      textAlign: screen.isTablet ? 'left' : 'center',
      marginBottom: screen.spacing.md,
    },
    
    button: {
      width: screen.getValue({
        small: '100%',
        medium: '48%',
        large: 'auto',
      }),
      marginTop: screen.isTablet ? 0 : screen.spacing.md,
      marginLeft: screen.isTablet ? screen.spacing.lg : 0,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ flex: screen.isTablet ? 1 : undefined }}>
        <Text style={styles.title}>
          {t('welcome.features.aiAnalysis.title')}
        </Text>
        <Text>
          {t('welcome.features.aiAnalysis.description')}
        </Text>
      </View>
      
      <Button
        title={t('common.continue')}
        onPress={() => {}}
        style={styles.button}
        size={screen.isPhone ? 'lg' : 'md'}
      />
    </View>
  );
}
```

## 📱 Responsive Breakpoints

- **small**: 0px - 374px (Küçük telefonlar)
- **medium**: 375px - 767px (Normal telefonlar) 
- **large**: 768px - 1023px (Tabletler)
- **xlarge**: 1024px+ (Büyük tabletler)

## 🌍 Desteklenen Diller

- **tr**: Türkçe
- **en**: English (fallback)

## 🎯 Best Practices

### Responsive Design
1. Her zaman breakpoint checks kullanın
2. Tablet ve telefon layoutları için farklı tasarımlar planlayın
3. Touch target'ları minimum 44px yapın
4. Font boyutları için `rf()` fonksiyonunu kullanın

### i18n Localization  
1. Hard-coded text kullanmayın
2. Uzun metinler için variables kullanın
3. Her anahtar için fallback sağlayın
4. Nested anahtarlar ile organize edin

### Performance
1. `useTranslation` hook'unu sadece çeviri gerekiyorsa kullanın
2. Style calculation'ları useMemo ile optimize edin
3. Responsive values'ları component dışında hesaplamayın 