// src/firebaseConfig.js

import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBrKN2jioT_Z0NnSgN2LufhlsFE5r77bbQ",
  authDomain: "my-app-vite-5861d.firebaseapp.com",
  databaseURL: "https://my-app-vite-5861d-default-rtdb.firebaseio.com",
  projectId: "my-app-vite-5861d",
  storageBucket: "my-app-vite-5861d.appspot.com",
  messagingSenderId: "303020129074",
  appId: "1:303020129074:web:9e638b86ecb6398a37352b",
  measurementId: "G-38S60FNJV4"
};

// https://my-app-vite-5861d.web.app

// Initialize App (prevent double initialization)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Realtime Database instance
export const db = getDatabase(app);

// Analytics (safe initialization for browsers)
export let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  } else {
    console.log("Analytics not supported in this environment.");
  }
});

export default app;
