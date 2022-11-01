// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAnVugCO0ESFi8CbP1dghPCiOoAvCQU-E",
  authDomain: "react-quiz-app-5507a.firebaseapp.com",
  projectId: "react-quiz-app-5507a",
  storageBucket: "react-quiz-app-5507a.appspot.com",
  messagingSenderId: "1016400296414",
  appId: "1:1016400296414:web:930926a9ce801d2a7dc54f",
  measurementId: "G-VVRB9G69DV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//INITIALIZE SERVICES
export const auth = getAuth(app)
export const db = getFirestore(app)