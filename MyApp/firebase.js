// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDYzKjC_JD3imqZjacsJvEsp8nvb6KkPLo",
    authDomain: "login-nowak-averbuch-smaevich.firebaseapp.com",
    projectId: "login-nowak-averbuch-smaevich",
    storageBucket: "login-nowak-averbuch-smaevich.appspot.com",
    messagingSenderId: "290640125257",
    appId: "1:290640125257:web:dbad063d65630f10c3ce98",
    measurementId: "G-5NNCX5BSP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
