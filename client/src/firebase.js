// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernauth-d88e5.firebaseapp.com",
  projectId: "mernauth-d88e5",
  storageBucket: "mernauth-d88e5.appspot.com",
  messagingSenderId: "1069796287647",
  appId: "1:1069796287647:web:404a128f404b0257c42eaa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
