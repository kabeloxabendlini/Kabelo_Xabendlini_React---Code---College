// FILE: src/firebase.js
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYMlbNYYPrRhyjc-yzkvncL1k_gZo1_C8",
  authDomain: "fir-todo-b76f4.firebaseapp.com",
  projectId: "fir-todo-b76f4",
  storageBucket: "fir-todo-b76f4.firebasestorage.app",
  messagingSenderId: "631032473138",
  appId: "1:631032473138:web:36c30d588304a4e7ddbe2b",
  measurementId: "G-FMC8D9B0DE"
};

const app = initializeApp(firebaseConfig);

// Auth setup
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore setup
export const db = getFirestore(app);

// Connect to emulators if in development
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}

export default app;

// https://fir-todo-b76f4.web.app
