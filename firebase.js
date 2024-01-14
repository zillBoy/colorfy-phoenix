// External Dependencies
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Internal Dependencies

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC54djOn9ANgeaUluL8NTy0eHXqMowReSQ",
  authDomain: "colorfy-6e561.firebaseapp.com",
  projectId: "colorfy-6e561",
  storageBucket: "colorfy-6e561.appspot.com",
  messagingSenderId: "372303198653",
  appId: "1:372303198653:web:8ac4fd3937e2d098f8fad4",
  measurementId: "G-8SF58L7YF7",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, firestore, storage, auth };
