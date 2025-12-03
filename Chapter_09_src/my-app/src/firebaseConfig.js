// src/firebaseConfig.js
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

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

// Only initialize Firebase if it hasn't been initialized yet
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const analytics = getAnalytics(app); // optional

export default app;