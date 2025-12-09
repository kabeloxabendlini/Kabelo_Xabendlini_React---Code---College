// FILE: src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAYMlbNYYPrRhyjc-yzkvncL1k_gZo1_C8",
  authDomain: "fir-todo-b76f4.firebaseapp.com",
  projectId: "fir-todo-b76f4",
  storageBucket: "fir-todo-b76f4.firebasestorage.app",
  messagingSenderId: "631032473138",
  appId: "1:631032473138:web:36c30d588304a4e7ddbe2b",
  measurementId: "G-FMC8D9B0DE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export services for use in components
export { db, auth, googleProvider };

export default app;

// https://fir-todo-b76f4.web.app