// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGzgc0AzNVMHcOAxLVBf813yqguxuNVBY",
  authDomain: "world-masher.firebaseapp.com",
  projectId: "world-masher",
  storageBucket: "world-masher.firebasestorage.app",
  messagingSenderId: "1033926910673",
  appId: "1:1033926910673:web:8e3455e0618b477a4edbf0",
  measurementId: "G-6C0Z04BF30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);



