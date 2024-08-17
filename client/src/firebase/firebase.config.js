// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0GOPaxNOlLXZcl0YsEiJanvHdp8PBpNI",
  authDomain: "solosphere-65bea.firebaseapp.com",
  projectId: "solosphere-65bea",
  storageBucket: "solosphere-65bea.appspot.com",
  messagingSenderId: "475125604410",
  appId: "1:475125604410:web:6bd611620372537d765503"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app