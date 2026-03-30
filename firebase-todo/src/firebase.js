// Import Firebase core function to initialize the app
import { initializeApp } from "firebase/app";

// Import Firebase Authentication services
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Import Firestore database service
import { getFirestore } from "firebase/firestore";

// Firebase project configuration
// These values uniquely identify and connect your app to Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAYMlbNYYPrRhyjc-yzkvncL1k_gZo1_C8",
  authDomain: "fir-todo-b76f4.firebaseapp.com",
  databaseURL: "https://fir-todo-b76f4-default-rtdb.firebaseio.com",
  projectId: "fir-todo-b76f4",
  storageBucket: "fir-todo-b76f4.firebasestorage.app",
  messagingSenderId: "631032473138",
  appId: "1:631032473138:web:36c30d588304a4e7ddbe2b",
  measurementId: "G-FMC8D9B0DE"
};

// Initialize Firebase app using the configuration above
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it for use in the app
export const auth = getAuth(app);

// Create and export Google authentication provider
// Used for "Sign in with Google"
export const googleProvider = new GoogleAuthProvider();

// Initialize and export Firestore database instance
export const db = getFirestore(app);

// Export the Firebase app instance (optional but useful)
export default app;

// Deployed app URL
// https://fir-todo-b76f4.web.app
