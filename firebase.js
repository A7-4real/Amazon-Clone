// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCSJgEaxjrfhSjMZrqXSCo_n-c-lSGyWx0",
    authDomain: "fir-d8219.firebaseapp.com",
    projectId: "fir-d8219",
    storageBucket: "fir-d8219.appspot.com",
    messagingSenderId: "11484746100",
    appId: "1:11484746100:web:bcee4a54f3dee065a79c21",
    measurementId: "G-VZPXPV8LWX"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };
