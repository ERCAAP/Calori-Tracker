import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [healthSync, setHealthSync] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

  const profileData = {
    name: 'Kullanıcı',
    email: 'kullanici@email.com',
    plan: 'Premium',
    joinDate: '15 Ağustos 2024',
  };

  const settingsGroups = [
    {
      title: 'Profil',
      items: [
        {
          id: 'edit-profile',
          title: 'Profili Düzenle',
          subtitle: 'Kişisel bilgilerinizi güncelleyin',
          icon: 'person-outline',
          type: 'navigation',
          onPress: () => console.log('Edit profile'),
        },
        {
          id: 'goals',
          title: 'Hedeflerim',
          subtitle: 'Kalori ve kilo hedeflerinizi ayarlayın',
          icon: 'flag-outline',
          type: 'navigation',
          onPress: () => console.log('Goals'),
        },
        {
          id: 'health-data',
          title: 'Sağlık Verileri',
          subtitle: 'Apple Health bağlantısı',
          icon: 'heart-outline',
          type: 'navigation',
          onPress: () => console.log('Health data'),
        },
      ],
    },
    {
      title: 'Ayarlar',
      items: [
        {
          id: 'notifications',
          title: 'Bildirimler',
          subtitle: 'Hatırlatma bildirimleri',
          icon: 'notifications-outline',
          type: 'toggle',
          value: notifications,
          onToggle: setNotifications,
        },
        {
          id: 'dark-mode',
          title: 'Karanlık Mod',
          subtitle: 'Görünüm teması',
          icon: 'moon-outline',
          type: 'toggle',
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          id: 'health-sync',
          title: 'Apple Health Senkronizasyonu',
          subtitle: 'Otomatik veri eşitleme',
          icon: 'sync-outline',
          type: 'toggle',
          value: healthSync,
          onToggle: setHealthSync,
        },
        {
          id: 'biometrics',
          title: 'Biyometrik Güvenlik',
          subtitle: 'Face ID / Touch ID',
          icon: 'finger-print-outline',
          type: 'toggle',
          value: biometrics,
          onToggle: setBiometrics,
        },
      ],
    },
    {
      title: 'Uygulama',
      items: [
        {
          id: 'language',
          title: 'Dil',
          subtitle: 'Türkçe',
          icon: 'language-outline',
          type: 'navigation',
          onPress: () => console.log('Language'),
        },
        {
          id: 'units',
          title: 'Ölçü Birimleri',
          subtitle: 'Kilogram, Santimetre',
          icon: 'calculator-outline',
          type: 'navigation',
          onPress: () => console.log('Units'),
        },
        {
          id: 'export-data',
          title: 'Veri Dışa Aktarma',
          subtitle: 'Verilerinizi yedekleyin',
          icon: 'download-outline',
          type: 'navigation',
          onPress: () => console.log('Export data'),
        },
      ],
    },
    {
      title: 'Destek',
      items: [
        {
          id: 'help',
          title: 'Yardım Merkezi',
          subtitle: 'SSS ve rehberler',
          icon: 'help-circle-outline',
          type: 'navigation',
          onPress: () => console.log('Help'),
        },
        {
          id: 'contact',
          title: 'İletişim',
          subtitle: 'Bize ulaşın',
          icon: 'mail-outline',
          type: 'navigation',
          onPress: () => console.log('Contact'),
        },
        {
          id: 'feedback',
          title: 'Geri Bildirim',
          subtitle: 'Uygulamayı değerlendirin',
          icon: 'star-outline',
          type: 'navigation',
          onPress: () => console.log('Feedback'),
        },
        {
          id: 'privacy',
          title: 'Gizlilik Politikası',
          subtitle: 'Veri kullanım koşulları',
          icon: 'shield-outline',
          type: 'navigation',
          onPress: () => console.log('Privacy'),
        },
      ],
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Çıkış Yap', 
          style: 'destructive',
          onPress: () => console.log('Logout'),
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8FAFC',
    },
    safeArea: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: '#FFFFFF',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1F2937',
    },
    content: {
      flex: 1,
    },
    profileCard: {
      backgroundColor: '#FFFFFF',
      marginHorizontal: 20,
      marginVertical: 16,
      borderRadius: 16,
      padding: 20,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    profileAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#3B82F6',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: 4,
    },
    profileEmail: {
      fontSize: 14,
      color: '#6B7280',
    },
    profileStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: '#F3F4F6',
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1F2937',
    },
    statLabel: {
      fontSize: 12,
      color: '#6B7280',
      marginTop: 4,
    },
    settingsGroup: {
      marginHorizontal: 20,
      marginBottom: 24,
    },
    groupTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#374151',
      marginBottom: 12,
      marginLeft: 4,
    },
    settingsCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 3,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
    },
    lastItem: {
      borderBottomWidth: 0,
    },
    settingIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#F3F4F6',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    settingContent: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: 2,
    },
    settingSubtitle: {
      fontSize: 14,
      color: '#6B7280',
    },
    settingAction: {
      marginLeft: 12,
    },
    logoutSection: {
      marginHorizontal: 20,
      marginBottom: 32,
    },
    logoutButton: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      elevation: 1,
      shadowColor: '#EF4444',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#EF4444',
    },
    versionInfo: {
      alignItems: 'center',
      paddingBottom: 32,
    },
    versionText: {
      fontSize: 12,
      color: '#9CA3AF',
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ayarlar</Text>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.profileAvatar}>
                <Ionicons name="person" size={30} color="#FFFFFF" />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{profileData.name}</Text>
                <Text style={styles.profileEmail}>{profileData.email}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>128</Text>
                <Text style={styles.statLabel}>Günler</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>-5.2kg</Text>
                <Text style={styles.statLabel}>Kilo Kaybı</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>Premium</Text>
                <Text style={styles.statLabel}>Plan</Text>
              </View>
            </View>
          </View>

          {/* Settings Groups */}
          {settingsGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.settingsGroup}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              <View style={styles.settingsCard}>
                {group.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.settingItem,
                      itemIndex === group.items.length - 1 && styles.lastItem,
                    ]}
                    onPress={item.type === 'navigation' ? (item as any).onPress : undefined}
                    disabled={item.type === 'toggle'}
                  >
                    <View style={styles.settingIcon}>
                      <Ionicons name={item.icon as any} size={18} color="#6B7280" />
                    </View>
                    <View style={styles.settingContent}>
                      <Text style={styles.settingTitle}>{item.title}</Text>
                      <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                    </View>
                    <View style={styles.settingAction}>
                                             {item.type === 'toggle' ? (
                         <Switch
                           value={(item as any).value}
                           onValueChange={(item as any).onToggle}
                           trackColor={{ false: '#F3F4F6', true: '#3B82F6' }}
                           thumbColor={(item as any).value ? '#FFFFFF' : '#FFFFFF'}
                        />
                      ) : (
                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Logout Button */}
          <View style={styles.logoutSection}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Çıkış Yap</Text>
            </TouchableOpacity>
          </View>

          {/* Version Info */}
          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>Sürüm 1.0.0</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
} 