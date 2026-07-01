export const tr = {
  // Common
  common: {
    ok: 'Tamam',
    cancel: 'İptal',
    yes: 'Evet',
    no: 'Hayır',
    error: 'Hata',
    success: 'Başarılı',
    loading: 'Yükleniyor...',
    save: 'Kaydet',
    continue: 'Devam Et',
    back: 'Geri',
    next: 'İleri',
    skip: 'Atla',
    done: 'Tamamla',
    edit: 'Düzenle',
    delete: 'Sil',
    share: 'Paylaş',
    retry: 'Tekrar Dene',
    close: 'Kapat',
  },

  // Welcome Screen
  welcome: {
    title: 'CaloriTracker',
    subtitle: 'Sağlıklı yaşamın yeni adresi',
    heroTitle: 'Kalori takibini\ndaha kolay hale getir',
    heroDescription: 'Yapay zeka destekli fotoğraf analizi ile yemeklerini saniyeler içinde kaydet. Hedeflerine ulaşmanın en akıllı yolu.',
    getStarted: 'Hemen Başla',
    signIn: 'Zaten hesabım var',
    features: {
      aiAnalysis: {
        title: 'AI Fotoğraf Analizi',
        description: 'Yemeğini fotoğrafla, kalori ve besin değerlerini otomatik hesapla',
      },
      smartTracking: {
        title: 'Akıllı Takip',
        description: 'Günlük, haftalık ve aylık ilerleme raporlarını görüntüle',
      },
      goalFocused: {
        title: 'Hedef Odaklı',
        description: 'Kişiselleştirilmiş hedefler belirle ve başarılarını kutla',
      },
    },
    stats: {
      fasterResults: 'Daha Hızlı Sonuç',
      accuracy: 'Doğruluk Oranı',
    },
  },

  // Auth Screen
  auth: {
    welcomeBack: 'Hoş Geldin',
    createAccount: 'Hesap Oluştur',
    signInSubtitle: 'Hesabına giriş yap ve kaldığın yerden devam et',
    signUpSubtitle: 'Sağlıklı yaşam yolculuğuna başlamak için hesap oluştur',
    fullName: 'Ad Soyad',
    email: 'E-posta',
    password: 'Şifre',
    confirmPassword: 'Şifre Tekrar',
    signIn: 'Giriş Yap',
    signUp: 'Hesap Oluştur',
    orContinueWith: 'veya',
    googleSignIn: 'Google ile devam et',
    appleSignIn: 'Apple ile devam et',
    alreadyHaveAccount: 'Zaten hesabın var mı?',
    dontHaveAccount: 'Hesabın yok mu?',
    forgotPassword: 'Şifremi Unuttum',
    placeholders: {
      fullName: 'Adınızı ve soyadınızı giriniz',
      email: 'E-posta adresinizi giriniz',
      password: 'Şifrenizi giriniz',
      confirmPassword: 'Şifrenizi tekrar giriniz',
    },
    errors: {
      nameRequired: 'Ad Soyad gereklidir',
      emailRequired: 'E-posta gereklidir',
      invalidEmail: 'Geçerli bir e-posta adresi giriniz',
      passwordRequired: 'Şifre gereklidir',
      passwordTooShort: 'Şifre en az 6 karakter olmalıdır',
      passwordsDontMatch: 'Şifreler eşleşmiyor',
    },
  },

  // Onboarding
  onboarding: {
    step: 'Adım',
    of: '/',
    personalInfo: {
      title: 'Seni Tanıyalım',
      subtitle: 'Kişiselleştirilmiş deneyim için temel bilgilerini paylaş',
      name: 'Ad Soyad',
      dateOfBirth: 'Doğum Tarihi',
      gender: 'Cinsiyet',
      height: 'Boy (cm)',
      weight: 'Kilo (kg)',
      activityLevel: 'Aktivite Seviyesi',
      activitySubtitle: 'Günlük aktivite seviyenizi seçiniz',
      genders: {
        male: 'Erkek',
        female: 'Kadın',
        other: 'Diğer',
      },
      activities: {
        sedentary: {
          title: 'Hareketsiz',
          description: 'Masabaşı iş, çok az aktivite',
        },
        light: {
          title: 'Az Aktif',
          description: 'Hafif egzersiz, haftada 1-3 gün',
        },
        moderate: {
          title: 'Orta Aktif',
          description: 'Orta seviye egzersiz, haftada 3-5 gün',
        },
        active: {
          title: 'Aktif',
          description: 'Yoğun egzersiz, haftada 6-7 gün',
        },
        veryActive: {
          title: 'Çok Aktif',
          description: 'Günde 2 kez egzersiz veya fiziksel iş',
        },
      },
      errors: {
        nameRequired: 'İsim gereklidir',
        invalidHeight: 'Boy 100-250 cm arasında olmalıdır',
        invalidWeight: 'Kilo 30-300 kg arasında olmalıdır',
        invalidAge: 'Yaş 13-100 arasında olmalıdır',
      },
    },
    goals: {
      title: 'Hedefini Belirle',
      subtitle: 'Hangi amaca odaklanmak istiyorsun?',
      loseWeight: 'Kilo Ver',
      maintainWeight: 'Kiloyu Koru',
      gainWeight: 'Kilo Al',
      currentWeight: 'Mevcut Kilo',
      goalWeight: 'Hedef Kilo',
      weeklyGoal: 'Haftalık Hedef',
      perWeek: '/hafta',
    },
    preferences: {
      title: 'Tercihlerini Ayarla',
      subtitle: 'Uygulama deneyimini kişiselleştir',
      units: 'Birimler',
      metric: 'Metrik (kg, cm)',
      imperial: 'Imperial (lb, ft)',
      notifications: 'Bildirimler',
      notificationsDesc: 'Yemek hatırlatmaları ve motivasyon mesajları',
      privacy: 'Gizlilik',
      privacyDesc: 'Profilin ve ilerlemen kimler tarafından görülebilir',
      privacyOptions: {
        public: 'Herkese Açık',
        friends: 'Sadece Arkadaşlar',
        private: 'Sadece Ben',
      },
    },
  },

  // Main App
  navigation: {
    home: 'Ana Sayfa',
    progress: 'İlerleme',
    settings: 'Ayarlar',
    profile: 'Profil',
  },

  // Home Screen
  home: {
    greeting: 'Merhaba',
    todaysProgress: 'Bugünün İlerlemesi',
    caloriesLeft: 'Kalan Kalori',
    caloriesConsumed: 'Alınan Kalori',
    caloriesBurned: 'Yakılan Kalori',
    macros: {
      protein: 'Protein',
      carbs: 'Karbonhidrat',
      fat: 'Yağ',
      fiber: 'Lif',
    },
    quickActions: {
      title: 'Hızlı İşlemler',
      addMeal: 'Yemek Ekle',
      addExercise: 'Egzersiz Ekle',
      logWeight: 'Kilo Kaydet',
      addWater: 'Su Ekle',
    },
    recentMeals: 'Son Yemekler',
    noMealsToday: 'Bugün henüz yemek eklenmemiş',
    addFirstMeal: 'İlk yemeğini ekle',
  },

  // Food Logging
  food: {
    addFood: 'Yemek Ekle',
    takePhoto: 'Fotoğraf Çek',
    searchFood: 'Yemek Ara',
    manualEntry: 'Manuel Giriş',
    analyzing: 'Fotoğraf Analiz Ediliyor...',
    analysisComplete: 'Analiz Tamamlandı',
    confirmFood: 'Yemeği Onayla',
    editFood: 'Yemeği Düzenle',
    quantity: 'Miktar',
    servingSize: 'Porsiyon Boyutu',
    nutritionFacts: 'Besin Değerleri',
    caloriesPerServing: 'Porsiyon Başına Kalori',
  },

  // Settings
  settings: {
    title: 'Ayarlar',
    account: 'Hesap',
    notifications: 'Bildirimler',
    units: 'Birimler',
    privacy: 'Gizlilik',
    about: 'Hakkında',
    help: 'Yardım',
    signOut: 'Çıkış Yap',
    version: 'Sürüm',
    language: 'Dil',
    darkMode: 'Karanlık Mod',
    dataExport: 'Veri Dışa Aktar',
    deleteAccount: 'Hesabı Sil',
  },

  // Errors
  errors: {
    networkError: 'İnternet bağlantısı hatası',
    serverError: 'Sunucu hatası',
    unknownError: 'Bilinmeyen hata',
    photoAnalysisFailed: 'Fotoğraf analizi başarısız',
    pleaseCompleteForm: 'Lütfen tüm alanları doğru şekilde doldurunuz',
    googleSignInCancelled: 'Google girişi iptal edildi',
    appleSignInUnavailable: 'Apple girişi kullanılamıyor',
  },

  // Success Messages
  success: {
    profileUpdated: 'Profil güncellendi',
    mealAdded: 'Yemek eklendi',
    weightLogged: 'Kilo kaydedildi',
    goalAchieved: 'Hedef başarıldı!',
    dataExported: 'Veriler dışa aktarıldı',
  },

  // Health
  health: {
    connect: 'Apple Health\'e Bağlan',
    connecting: 'Bağlanıyor...',
    notNow: 'Şimdi Değil',
    skip: 'Atla',
    title: 'Apple Health ile Daha Akıllı Takip',
    subtitle: 'Sağlık verilerinizi otomatik olarak senkronize edin ve daha doğru kalori hesaplamaları elde edin.',
    permissionsTitle: 'Hangi Verilere Erişim İstiyoruz?',
    benefitsTitle: 'Faydaları',
    privacyTitle: '🔒 Gizlilik ve Güvenlik',
    privacyText: 'Verileriniz sadece sizin cihazınızda işlenir. Apple Health verileri asla sunucularımıza gönderilmez. Tam kontrolünüz sizde!',
    dataTypes: {
      steps: 'Adım Sayısı',
      activeEnergy: 'Yakılan Kalori',
      heartRate: 'Kalp Atış Hızı',
      sleep: 'Uyku Verisi',
      bodyMass: 'Kilo Takibi',
      height: 'Boy Bilgisi',
      workouts: 'Egzersiz Verileri',
    },
    descriptions: {
      steps: 'Günlük adım aktivitelerini takip et',
      activeEnergy: 'Aktivite sırasında yakılan kaloriyi hesapla',
      heartRate: 'Sağlık durumunu daha iyi analiz et',
      sleep: 'Uyku kalitesi ve süresini görüntüle',
      bodyMass: 'Hedeflerine ulaşma sürecini izle',
      height: 'Daha doğru kalori hesaplamaları için',
      workouts: 'Antrenman geçmişi ve performans',
    },
    benefits: {
      accuracy: 'Daha doğru kalori ve aktivite hesaplamaları',
      sync: 'Otomatik veri senkronizasyonu - manuel giriş gerekmez',
      insights: 'Kapsamlı sağlık analizi ve kişiselleştirilmiş öneriler',
    },
    support: {
      title: 'Bizi Desteklemek İster Misiniz?',
      subtitle: 'Uygulamamızı beğendiyseniz, App Store\'da 5 yıldız vererek diğer kullanıcılara ulaşmamıza yardım edebilirsiniz! ⭐️',
      yes: 'Evet, Değerlendir! ⭐️',
      no: 'Şimdi Değil',
    },
    errors: {
      iosOnly: 'Apple Health sadece iOS cihazlarda kullanılabilir.',
      permissionDenied: 'Apple Health izinleri reddedildi. Daha sonra ayarlardan etkinleştirebilirsiniz.',
      connectionFailed: 'Apple Health\'e bağlanırken bir sorun oluştu. Daha sonra ayarlardan etkinleştirebilirsiniz.',
    },
  },
}; 