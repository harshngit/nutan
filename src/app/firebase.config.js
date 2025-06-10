import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfXMTL7VGr6RbWDPSvOdQXB_-RUCZS16s",
  authDomain: "nutandev-f7518.firebaseapp.com",
  projectId: "nutandev-f7518",
  storageBucket: "nutandev-f7518.firebasestorage.app",
  messagingSenderId: "678295692148",
  appId: "1:678295692148:web:fa2586cb20bebf23b20221",
  measurementId: "G-KVHB2KW8NV"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const database = getDatabase(app)
export const storage = getStorage(app)
export const auth = getAuth()
const analytics = getAnalytics(app);