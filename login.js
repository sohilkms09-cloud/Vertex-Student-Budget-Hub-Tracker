// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your verified web app credentials configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIwzIWIVryC9yhuzWC5SPiYkHeN6uCjhM",
  authDomain: "sbet-61920.firebaseapp.com",
  projectId: "sbet-61920",
  storageBucket: "sbet-61920.firebasestorage.app",
  messagingSenderId: "95304488160",
  appId: "1:95304488160:web:5ae96bba9f747cba30ac85",
  measurementId: "G-Q6TKQGCHRX"
};

// Initialize app instances
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Intercept interface node bindings
const googleBtn = document.getElementById("googleLogin");

if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        // Set session variables to bypass the dashboard navigation guard
        sessionStorage.setItem('userAuthenticated', 'true');
        sessionStorage.setItem('userEmail', user.email);
        sessionStorage.setItem('userDisplayName', user.displayName);

        alert("Welcome " + user.displayName);
        window.location.href = "Dashboard.html";
      })
      .catch((error) => {
        console.error("Authentication popup window closed or blocked:", error);
        alert("Login failed: " + error.message);
      });
  });
}