import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDC8TR94QKYxOa0FwHMjotqlKI9nvQ905A",
  authDomain: "skincare-93052.firebaseapp.com",
  projectId: "skincare-93052",
  storageBucket: "skincare-93052.firebasestorage.app",
  messagingSenderId: "79596647800",
  appId: "1:79596647800:web:12b9d3af2769c4124d048d",
  measurementId: "G-P5Q1522RH3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();     
export const facebookProvider = new FacebookAuthProvider();

export const db = getFirestore(app);    
export const storage = getStorage(app);
