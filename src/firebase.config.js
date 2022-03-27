// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvgrmgt9XH1tB0u5URsLFZXCB77hQU28M",
  authDomain: "house-market-place-app-f40d8.firebaseapp.com",
  projectId: "house-market-place-app-f40d8",
  storageBucket: "house-market-place-app-f40d8.appspot.com",
  messagingSenderId: "705272119760",
  appId: "1:705272119760:web:70cf8b23dbe1532d69b9d5"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
export const db = getFirestore()