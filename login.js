// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBIwzIWIVryC9yhuzWC5SPiYkHeN6uCjhM",
  authDomain: "sbet-61920.firebaseapp.com",
  projectId: "sbet-61920",
  storageBucket: "sbet-61920.firebasestorage.app",
  messagingSenderId: "95304488160",
  appId: "1:95304488160:web:5ae96bba9f747cba30ac85",
  measurementId: "G-Q6TKQGCHRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Button
const googleBtn = document.getElementById("googleLogin");

// Login function
googleBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      // FIXED SECTOR: ALLOCATE ACCOUNT PARAMETERS INTO TAB CACHE TO ENGAGE THE DASHBOARD NAVIGATION GUARD
      sessionStorage.setItem('userAuthenticated', 'true');
      sessionStorage.setItem('userEmail', user.email);
      sessionStorage.setItem('userDisplayName', user.displayName);

      alert("Welcome " + user.displayName);
      console.log(user);
      
      // Clear routing path redirect parameter allocation
      window.location.href = "Dashboard.html";
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
});// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBIwzIWIVryC9yhuzWC5SPiYkHeN6uCjhM",
  authDomain: "sbet-61920.firebaseapp.com",
  projectId: "sbet-61920",
  storageBucket: "sbet-61920.firebasestorage.app",
  messagingSenderId: "95304488160",
  appId: "1:95304488160:web:5ae96bba9f747cba30ac85",
  measurementId: "G-Q6TKQGCHRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Button
const googleBtn = document.getElementById("googleLogin");

// Login function
googleBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      // FIXED SECTOR: ALLOCATE ACCOUNT PARAMETERS INTO TAB CACHE TO ENGAGE THE DASHBOARD NAVIGATION GUARD
      sessionStorage.setItem('userAuthenticated', 'true');
      sessionStorage.setItem('userEmail', user.email);
      sessionStorage.setItem('userDisplayName', user.displayName);

      alert("Welcome " + user.displayName);
      console.log(user);
      
      // Clear routing path redirect parameter allocation
      window.location.href = "Dashboard.html";
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
});