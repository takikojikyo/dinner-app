
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu8zU5hi4-nPY7T0zSh52WQpZTuvkv15o",
  authDomain: "my-dinner-app-01.firebaseapp.com",
  projectId: "my-dinner-app-01",
  storageBucket: "my-dinner-app-01.firebasestorage.app",
  messagingSenderId: "1082944421351",
  appId: "1:1082944421351:web:152f23ed6869b84c425142",
  measurementId: "G-BZZK88J2BZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const db=getFirestore(app);
export { auth, provider };

