// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmi5k9V6J8lHKMtGcC8l64jI4de0EH8os",
  authDomain: "pdp-velez.firebaseapp.com",
  databaseURL: "https://pdp-velez-default-rtdb.firebaseio.com",
  projectId: "pdp-velez",
  storageBucket: "pdp-velez.firebasestorage.app",
  messagingSenderId: "1093809949734",
  appId: "1:1093809949734:web:792a557ab91bf1d31d2ae7"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);