import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9aR79SUUUJBQfAWVpIj6z7LGSzHbKhnI",
  authDomain: "ykos-database.firebaseapp.com",
  projectId: "ykos-database",
  storageBucket: "ykos-database.firebasestorage.app",
  messagingSenderId: "1046957978671",
  appId: "1:1046957978671:web:56f66d450f5b32e265c2da"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);