// src/firebase.jsx
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBN9WlmRc3SedmC4agM1G-rYqezGR22iZE",
  authDomain: "crudproject-45834.firebaseapp.com",
  databaseURL: "https://crudproject-45834.firebaseio.com",
  projectId: "crudproject-45834",
  storageBucket: "crudproject-45834.appspot.com",
  messagingSenderId: "590481645308",
  appId: "1:590481645308:web:613e62539967b876"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
