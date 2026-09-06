import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDOZ-eG9CM8qmxozxdBHLmuW-h_T7qmvB0",
  authDomain: "wayclear-3601a.firebaseapp.com",
  projectId: "wayclear-3601a",
  storageBucket: "wayclear-3601a.firebasestorage.app",
  messagingSenderId: "135083003251",
  appId: "1:135083003251:web:60b0fcd893a13e98bfc906",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
