import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9ARlcTt4bxPSeWineY89Ha-CtVgml1NI",
  authDomain: "veriafc-48fc5.firebaseapp.com",
  projectId: "veriafc-48fc5",
  storageBucket: "veriafc-48fc5.firebasestorage.app",
  messagingSenderId: "162482987875",
  appId: "1:162482987875:web:f9609a7313c1da464d2956",
  measurementId: "G-9ZZ4QGBJXR"
};


// Validate required Firebase config
if (typeof window !== 'undefined') {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingFields = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);

  if (missingFields.length > 0) {
    console.error('Firebase configuration error: Missing required environment variables:', missingFields);
    console.error('Please set the following environment variables:');
    missingFields.forEach(field => {
      console.error(`  NEXT_PUBLIC_FIREBASE_${field.toUpperCase().replace(/([A-Z])/g, '_$1')}`);
    });
  }
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
