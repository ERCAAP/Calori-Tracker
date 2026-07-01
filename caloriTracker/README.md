# CaloriTracker - AI-Powered Calorie Tracking App

Modern ve akıllı kalori takip uygulaması. Yapay zeka destekli fotoğraf analizi ile yemeklerinizi saniyeler içinde kaydedin ve sağlıklı yaşam hedeflerinize ulaşın.

## ✨ Özellikler

- **🤖 AI Fotoğraf Analizi**: OpenAI Vision API ile yemek fotoğraflarını otomatik analiz
- **📊 Akıllı Takip**: Günlük, haftalık ve aylık ilerleme raporları
- **🎯 Hedef Odaklı**: Kişiselleştirilmiş hedefler ve başarı takibi
- **🔐 Güvenli Giriş**: Firebase Auth ile Google ve Apple Sign-In
- **📱 Modern UI**: Gradient tasarım ve smooth animasyonlar
- **📐 Responsive Design**: Telefon ve tablet için optimize edilmiş
- **⚡ Hızlı Performans**: React Native ve Expo ile optimize edilmiş
- **🌍 Çoklu Dil**: Türkçe ve İngilizce destek (i18n)

## 🛠 Teknolojiler

- **Frontend**: React Native, Expo
- **Backend**: Firebase (Auth, Firestore, Storage)
- **AI**: OpenAI Vision API
- **State Management**: Zustand
- **Navigation**: React Navigation v6
- **UI Components**: Custom component library with responsive design
- **Styling**: React Native StyleSheet with design tokens
- **Responsive**: Custom breakpoint system with useWindowDimensions
- **i18n**: Multi-language support with expo-localization
- **TypeScript**: Full type safety

## 📦 Kurulum

### Önkoşullar

- Node.js (18+)
- npm veya yarn
- Expo CLI
- iOS Simulator (Mac) veya Android Emulator

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd caloriTracker
```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Environment variables ayarlayın**
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyip API anahtarlarınızı ekleyin:
- Firebase configuration
- Google OAuth credentials
- OpenAI API key

4. **Firebase projesini kurun**
- Firebase Console'da yeni proje oluşturun
- Authentication, Firestore ve Storage'ı aktif edin
- Web app configuration'ınızı `.env` dosyasına ekleyin

5. **Uygulamayı çalıştırın**
   ```bash
npm start
   ```

## 🏗 Proje Yapısı

```
src/
├── components/           # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── index.ts
├── screens/             # Screen components
│   ├── WelcomeScreen.tsx
│   ├── AuthScreen.tsx
│   └── onboarding/
│       ├── PersonalInfoScreen.tsx
│       ├── GoalsScreen.tsx
│       ├── PreferencesScreen.tsx
│       ├── CompletedScreen.tsx
│       └── index.ts
├── navigation/          # Navigation configuration
├── services/            # API calls and business logic
│   ├── firebase.ts
│   ├── authService.ts
│   └── openaiService.ts
├── hooks/               # Custom React hooks
│   ├── useAuthStore.ts
│   ├── useI18n.ts
│   ├── useResponsiveScreen.ts
│   └── index.ts
├── utils/               # Helper functions
│   ├── responsive.ts
│   └── index.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── constants/           # App constants and config
│   ├── Colors.ts
│   └── translations/
│       ├── tr.ts
│       ├── en.ts
│       └── index.ts
└── assets/              # Images, fonts, etc.
```

## 🎨 Design System

### Renk Paleti
- **Primary**: Warm coral to orange gradient (#FF6B6B → #FF8E53)
- **Secondary**: Mint to blue gradient (#4ECDC4 → #45B7D1)
- **Background**: Off-white (#FAFBFC)
- **Text**: Dark gray (#2D3748) and muted (#718096)

### Component Library
- **Button**: Gradient destekli, multiple variants
- **Card**: Shadow ve border variants
- **Input**: Icon support, validation states
- **Typography**: Consistent font scales

## 🔧 Geliştirme Kuralları

### Code Style
- TypeScript strict mode
- Functional components only
- Custom hooks for logic separation
- Descriptive naming conventions

### State Management
- Zustand for global state
- React Context for theme/auth
- Local state for component-specific data

### Performance
- Image optimization
- List virtualization
- Memoization for expensive calculations
- Bundle size optimization

## 📱 Onboarding Flow

1. **Welcome Screen**: App tanıtımı ve özellikler
2. **Authentication**: Google/Apple/Email girişi
3. **Personal Info**: Kullanıcı bilgileri toplama
4. **Goal Setting**: Hedef belirleme
5. **Preferences**: Birim ve bildirim ayarları

## 🚀 Deployment

### Development Build
```bash
npx expo build:ios
npx expo build:android
```

### Production Build
```bash
npx expo build:ios --release-channel production
npx expo build:android --release-channel production
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- Email: your-email@example.com
- GitHub: @yourusername

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
