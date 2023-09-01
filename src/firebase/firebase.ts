// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHSvshaOSciLnmFkf33vkPeznYXhEojHM",
  authDomain: "quiz-app-9d630.firebaseapp.com",
  projectId: "quiz-app-9d630",
  storageBucket: "quiz-app-9d630.appspot.com",
  messagingSenderId: "735490579937",
  appId: "1:735490579937:web:4b9adcf91c0a4acfaac6a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)