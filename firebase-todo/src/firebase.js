// Import Firebase core function to initialize the app
import { initializeApp } from "firebase/app";

// Import Firebase Authentication services
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Import Firestore database service
import { getFirestore } from "firebase/firestore";

// Firebase project configuration
// These values uniquely identify and connect your app to Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBrKN2jioT_Z0NnSgN2LufhlsFE5r77bbQ", // Public API key for Firebase
  authDomain: "fir-todo-b76f4.firebaseapp.com",  // ← should say fir-todo-b76f4
  projectId: "fir-todo-b76f4",                    // ← should say fir-todo-b76f4
  storageBucket: "fir-todo-b76f4.appspot.com", // Cloud Storage bucket for file uploads
  messagingSenderId: "303020129074", // Sender ID for Firebase Cloud Messaging
  appId: "1:303020129074:web:9e638b86ecb6398a37352b", // Unique app identifier
  measurementId: "G-38S60FNJV4", // Google Analytics measurement ID
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
