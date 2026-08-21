// src/data/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9aR79SUUUJBQfAWVpIj6z7LGSzHbKhnI",
  authDomain: "ykos-database.firebaseapp.com",
  projectId: "ykos-database",
  storageBucket: "ykos-database.firebasestorage.app",
  messagingSenderId: "1046957978671",
  appId: "1:1046957978671:web:56f66d450f5b32e265c2da",
};

// Firebase yalnızca bir kez başlatılır.
// Vite Hot Reload sırasında siyah ekran ve duplicate-app hatasını önler.
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

// Firestore veritabanı bağlantısı
export const db = getFirestore(app);

export default app;