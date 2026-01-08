import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrKN2jioT_Z0NnSgN2LufhlsFE5r77bbQ",
  authDomain: "my-app-vite-5861d.firebaseapp.com",
  projectId: "my-app-vite-5861d",
  storageBucket: "my-app-vite-5861d.appspot.com",
  messagingSenderId: "303020129074",
  appId: "1:303020129074:web:9e638b86ecb6398a37352b",
  measurementId: "G-38S60FNJV4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;

// https://fir-todo-b76f4.web.app
