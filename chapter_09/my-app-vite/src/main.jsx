import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import * as firebase from 'firebase'; 
 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrKN2jioT_Z0NnSgN2LufhlsFE5r77bbQ",
  authDomain: "my-app-vite-5861d.firebaseapp.com",
  projectId: "my-app-vite-5861d",
  storageBucket: "my-app-vite-5861d.firebasestorage.app",
  messagingSenderId: "303020129074",
  appId: "1:303020129074:web:9e638b86ecb6398a37352b",
  measurementId: "G-38S60FNJV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
