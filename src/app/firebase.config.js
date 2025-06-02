// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage, ref } from "firebase/storage" 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp3tqmSADnaHvjgRQLbisLIcBk1P0gR2o",
  authDomain: "union-living.firebaseapp.com",
  projectId: "union-living",
  storageBucket: "union-living.appspot.com",
  messagingSenderId: "1020897746314",
  appId: "1:1020897746314:web:069d3511127655e2ef3c73",
  measurementId: "G-RZN1HJ2RWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth()
export const database = getDatabase(app)