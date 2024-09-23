// src/firebase/firebaseFirestore.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };
export default app; // Optionally, export the app instance if needed