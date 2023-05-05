// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3JGHwDLD0Zcy1_NGBfvDdxID5XfBRfbM",
  authDomain: "app-combis-969c4.firebaseapp.com",
  projectId: "app-combis-969c4",
  storageBucket: "app-combis-969c4.appspot.com",
  messagingSenderId: "804789704753",
  appId: "1:804789704753:web:c8cbec609d72f9154c9d10"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth= getAuth(app)