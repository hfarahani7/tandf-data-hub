import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
​​import {
    ​​  GoogleAuthProvider,
    ​​  getAuth,
    ​​  signInWithPopup,
    ​​  signInWithEmailAndPassword,
    ​​  createUserWithEmailAndPassword,
    ​​  sendPasswordResetEmail,
    ​​  signOut,
    ​​} from "firebase/auth";
​​import {
    ​​  getDatabase,
    ​​  query,
    ​​  getDocs,
    ​​  collection,
    ​​  where,
    ​​  addDoc,
    ​​} from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzz_sjnhNqpJXhk7DiYbKkM5G2QO3IyQM",
  authDomain: "tf-data-hub.firebaseapp.com",
  databaseURL: "https://tf-data-hub-default-rtdb.firebaseio.com",
  projectId: "tf-data-hub",
  storageBucket: "tf-data-hub.appspot.com",
  messagingSenderId: "425085592952",
  appId: "1:425085592952:web:34071330fe19778800548d",
  measurementId: "G-C9T352DEZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

export {
  auth,
  db
};