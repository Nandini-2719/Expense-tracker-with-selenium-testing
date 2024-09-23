// src/firebase/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBw6OFKdnZ0tkfmENUVG8WHoau4bobQDZk",
  authDomain: "expensetracker-d611c.firebaseapp.com",
  projectId: "expensetracker-d611c",
  storageBucket: "expensetracker-d611c.appspot.com",
  messagingSenderId: "273465735084",
  appId: "1:273465735084:web:4581ee267982f744dfac09",
  measurementId: "G-X5FH0QCWKJ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
