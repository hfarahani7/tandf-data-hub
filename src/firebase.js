// Import the functions you need from the SDKs you need
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
    ​​  getFirestore,
    ​​  query,
    ​​  getDocs,
    ​​  collection,
    ​​  where,
    ​​  addDoc,
    ​​} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore(app);

export default app;