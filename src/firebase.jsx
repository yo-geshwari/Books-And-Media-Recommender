import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD3BkFKRf4abbSBDNFqJRo5mj8Z-XI98XQ",
    authDomain: "reviewhub-eb490.firebaseapp.com",
    projectId: "reviewhub-eb490",
    storageBucket: "reviewhub-eb490.appspot.com",
    messagingSenderId: "1072640692988",
    appId: "1:1072640692988:web:128f011456e0fddf81bd79"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
