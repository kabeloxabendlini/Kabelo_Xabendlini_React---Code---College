// FILE: src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --------------------
// Firebase config
// --------------------
const firebaseConfig = {
  apiKey: "AIzaSyBrKN2jioT_Z0NnSgN2LufhlsFE5r77bbQ",
  authDomain: "my-app-vite-5861d.firebaseapp.com",
  databaseURL: "https://my-app-vite-5861d-default-rtdb.firebaseio.com",
  projectId: "my-app-vite-5861d",
  storageBucket: "my-app-vite-5861d.firebasestorage.app",
  messagingSenderId: "303020129074",
  appId: "1:303020129074:web:9e638b86ecb6398a37352b",
  measurementId: "G-38S60FNJV4",
};

// --------------------
// Initialize Firebase
// --------------------
const app = initializeApp(firebaseConfig);

// --------------------
// Auth setup
// --------------------
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// --------------------
// Firestore setup
// --------------------
export const db = getFirestore(app);

// --------------------
// Optional: local Firestore emulator only
// --------------------
// Uncomment this block if you want to test Firestore locally

if (window.location.hostname === "localhost") {
  import("firebase/firestore").then(({ connectFirestoreEmulator }) => {
    connectFirestoreEmulator(db, "localhost", 8080);
    console.log("Connected Firestore to local emulator");
  });
}

export default app;


// https://fir-todo-b76f4.web.app
