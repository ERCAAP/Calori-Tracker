import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useOnboarding } from '../src/contexts/OnboardingContext';
import { useAuthListener, useAuthStore } from '../src/hooks/useAuthStore';

export default function Index() {
  const { isAuthenticated, isLoading, isInitialized, user } = useAuthStore();
  const { isOnboardingComplete } = useOnboarding();
  
  // Initialize auth listener
  useAuthListener();

  // Show loading while auth is initializing
  if (!isInitialized || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F8FA' }}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  // If not authenticated, go to auth
  if (!isAuthenticated || !user) {
    return <Redirect href="/auth" />;
  }

  // If authenticated but onboarding not complete, redirect to onboarding flow
  if (!isOnboardingComplete()) {
    return <Redirect href="/onboarding/welcome" />;
  }

  // If both authenticated and onboarding complete, go to main app
  return <Redirect href="/(tabs)" />;
}
