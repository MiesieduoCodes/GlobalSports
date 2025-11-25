import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLZvWASx1Bv1jQGLktQ8YQsnLKkGCWWNM",
  authDomain: "sportsfc-ddcec.firebaseapp.com",
  projectId: "sportsfc-ddcec",
  storageBucket: "sportsfc-ddcec.firebasestorage.app",
  messagingSenderId: "429557761438",
  appId: "1:429557761438:web:44a1f839da704c238dc28f",
  measurementId: "G-G9HFY2B01K"
};

// Initialize Firebase only in browser environment
const isClient = typeof window !== 'undefined';

if (!isClient) {
  console.warn('Firebase is being initialized on the server. Some features might not work as expected.');
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
