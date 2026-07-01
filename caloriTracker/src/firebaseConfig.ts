import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

// Firebase configuration for caloritracker project
const firebaseConfig = {
  apiKey: "REDACTED",
  authDomain: "caloritracker-c7532.firebaseapp.com",
  projectId: "caloritracker-c7532",
  storageBucket: "caloritracker-c7532.firebasestorage.app",
  messagingSenderId: "188997381257",
  appId: "1:188997381257:web:49c2bf9c484c56dc366a58",
  measurementId: "G-92HGPJBPKG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Set functions region (optional - default is us-central1)
// connectFunctionsEmulator(functions, 'localhost', 5001); // For development

export default app; 