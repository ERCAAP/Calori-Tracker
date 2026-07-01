import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { create } from 'zustand';
import { auth } from '../services/firebase';
import { OnboardingData, User, UserProfile } from '../types';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  onboardingData: OnboardingData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
  
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setOnboardingData: (data: OnboardingData) => void;
  updateOnboardingStep: (step: number) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  signOut: () => void;
  initialize: () => Promise<void>;
}

const AUTH_USER_KEY = 'auth_user';
const AUTH_PROFILE_KEY = 'auth_profile';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  onboardingData: null,
  isLoading: true,
  isAuthenticated: false,
  isInitialized: false,

  setUser: (user) => {
    set({ 
      user, 
      isAuthenticated: !!user,
      isLoading: false 
    });
    
    // Persist user to storage
    if (user) {
      AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      AsyncStorage.removeItem(AUTH_USER_KEY);
    }
  },

  setProfile: (profile) => {
    set({ profile });
    
    // Persist profile to storage
    if (profile) {
      AsyncStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(profile));
    } else {
      AsyncStorage.removeItem(AUTH_PROFILE_KEY);
    }
  },

  setOnboardingData: (data) => 
    set({ onboardingData: data }),

  updateOnboardingStep: (step) => {
    const { onboardingData } = get();
    if (onboardingData) {
      set({
        onboardingData: {
          ...onboardingData,
          step,
        },
      });
    }
  },

  setLoading: (isLoading) => 
    set({ isLoading }),

  setInitialized: (isInitialized) =>
    set({ isInitialized }),

  signOut: async () => {
    try {
      await auth.signOut();
      await AsyncStorage.multiRemove([AUTH_USER_KEY, AUTH_PROFILE_KEY]);
      set({ 
        user: null, 
        profile: null, 
        onboardingData: null,
        isAuthenticated: false,
        isLoading: false 
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  },

  initialize: async () => {
    try {
      set({ isLoading: true });
      
      // Load persisted data
      const [userStr, profileStr] = await AsyncStorage.multiGet([
        AUTH_USER_KEY, 
        AUTH_PROFILE_KEY
      ]);
      
      if (userStr[1]) {
        const user = JSON.parse(userStr[1]);
        set({ user, isAuthenticated: true });
      }
      
      if (profileStr[1]) {
        const profile = JSON.parse(profileStr[1]);
        set({ profile });
      }
      
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      set({ isLoading: false, isInitialized: true });
    }
  },
}));

// Firebase auth state listener
export function useAuthListener() {
  const { setUser, setLoading, initialize, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || '',
          emailVerified: firebaseUser.emailVerified,
        };
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [setUser, setLoading]);
} 