// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Correct import statement

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGYJSoJfiGRcx4GQsgj_kSqEv9ureOqFE",
  authDomain: "shop-react-native-39afc.firebaseapp.com",
  projectId: "shop-react-native-39afc",
  storageBucket: "shop-react-native-39afc.appspot.com",
  messagingSenderId: "976782851927",
  appId: "1:976782851927:web:72d6ffc0271a3a34ef8812",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Corrected function name
