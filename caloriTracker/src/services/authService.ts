// import * as AppleAuthentication from 'expo-apple-authentication';
import {
    User as FirebaseUser,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Platform } from 'react-native';
import { User, UserProfile } from '../types';
import { auth, db } from './firebase';

class AuthService {
  async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      return this.mapFirebaseUser(credential.user);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async signUpWithEmail(email: string, password: string, displayName: string): Promise<User> {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(credential.user, {
        displayName,
      });

      const user = this.mapFirebaseUser(credential.user);
      await this.createUserProfile(user);
      
      return user;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async signInWithGoogle(): Promise<User> {
    try {
      if (Platform.OS === 'web') {
        // Web implementation would go here
        throw new Error('Google Sign-In on web not implemented yet');
      }

      // For now, we'll simulate Google sign in
      // In a real app, you'd use expo-auth-session or expo-google-sign-in
      throw new Error('Google Sign-In will be implemented in next phase');
      
    } catch (error: any) {
      throw new Error(error.message || 'Google sign in failed');
    }
  }

  async signInWithApple(): Promise<User> {
    try {
      if (Platform.OS !== 'ios') {
        throw new Error('Apple Sign-In is only available on iOS');
      }

      // Temporarily disabled Apple Sign-In
      // Will be re-enabled after expo-apple-authentication is properly configured
      throw new Error('Apple Sign-In will be implemented in next phase');

      /*
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error('Apple Sign-In failed - no identity token');
      }

      // Create Firebase credential
      const provider = new OAuthProvider('apple.com');
      const firebaseCredential = provider.credential({
        idToken: credential.identityToken,
        rawNonce: undefined, // You should implement nonce for production
      });

      const firebaseAuth = await signInWithCredential(auth, firebaseCredential);
      const user = this.mapFirebaseUser(firebaseAuth.user);

      // Check if user profile exists, create if not
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await this.createUserProfile(user, {
          firstName: credential.fullName?.givenName || '',
          lastName: credential.fullName?.familyName || '',
        });
      }

      return user;
      */
    } catch (error: any) {
      if (error.message === 'Apple Sign-In was canceled') {
        throw new Error('Apple Sign-In was canceled');
      }
      throw new Error(error.message || 'Apple Sign-In failed');
    }
  }

  async signInAnonymously(): Promise<User> {
    try {
      // For MVP, we'll create a temporary user
      const tempUser: User = {
        uid: `temp_${Date.now()}`,
        email: '',
        displayName: 'Guest User',
        photoURL: '',
        emailVerified: false,
        isAnonymous: true,
      };

      // In production, you'd use Firebase Anonymous Auth
      return tempUser;
    } catch (error: any) {
      throw new Error('Anonymous sign in failed');
    }
  }

  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    } catch (error: any) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  async updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', uid), data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async createUserProfile(user: User, additionalData?: any): Promise<void> {
    try {
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        firstName: additionalData?.firstName || '',
        lastName: additionalData?.lastName || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);
    } catch (error: any) {
      console.error('Error creating user profile:', error);
    }
  }

  private mapFirebaseUser(firebaseUser: FirebaseUser): User {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL || '',
      emailVerified: firebaseUser.emailVerified,
      isAnonymous: firebaseUser.isAnonymous,
    };
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.';
      case 'auth/wrong-password':
        return 'Şifre hatalı.';
      case 'auth/email-already-in-use':
        return 'Bu e-posta adresi zaten kullanımda.';
      case 'auth/weak-password':
        return 'Şifre çok zayıf. En az 6 karakter olmalıdır.';
      case 'auth/invalid-email':
        return 'Geçersiz e-posta adresi.';
      case 'auth/too-many-requests':
        return 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.';
      default:
        return 'Bir hata oluştu. Lütfen tekrar deneyin.';
    }
  }

  // Check if Apple Sign-In is available
  isAppleAuthAvailable(): Promise<boolean> {
    if (Platform.OS !== 'ios') {
      return Promise.resolve(false);
    }
    // Temporarily return false until Apple Auth is properly configured
    return Promise.resolve(false);
    // return AppleAuthentication.isAvailableAsync();
  }

  // Auth state listener
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, (firebaseUser) => {
      const user = firebaseUser ? this.mapFirebaseUser(firebaseUser) : null;
      callback(user);
    });
  }
}

export default new AuthService(); 