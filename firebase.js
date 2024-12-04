// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"; 
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  sendEmailVerification 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDL7SkZSGYoe1dAwdE7o00vQfaA1Y_dMpI",
  authDomain: "hackathon-fe36a.firebaseapp.com",
  projectId: "hackathon-fe36a",
  storageBucket: "hackathon-fe36a.firebasestorage.app",
  messagingSenderId: "380870395028",
  appId: "1:380870395028:web:b6d7729089e361c1b76081"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

// Get Firebase Authentication instance
const auth = getAuth(app);

// Export Firestore and Auth services
export { db, auth };

// Export necessary auth functions
export { 
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification 
};
