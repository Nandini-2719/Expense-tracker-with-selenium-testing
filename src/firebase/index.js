// src/firebase/index.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBw6OFKdnZ0tkfmENUVG8WHoau4bobQDZk",
  authDomain: "expensetracker-d611c.firebaseapp.com",
  projectId: "expensetracker-d611c",
  storageBucket: "expensetracker-d611c.appspot.com",
  messagingSenderId: "273465735084",
  appId: "1:273465735084:web:4581ee267982f744dfac09",
  measurementId: "G-X5FH0QCWKJ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
