import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3we3VN8RNSOqc4Z4EB_DzUJIhhIEjDsY",
  authDomain: "election-assistant-513e7.firebaseapp.com",
  projectId: "election-assistant-513e7",
  storageBucket: "election-assistant-513e7.firebasestorage.app",
  messagingSenderId: "833064018775",
  appId: "1:833064018775:web:97af92a740aa86820cd412",
  measurementId: "G-DHXBGT9ZT6"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
