// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXGZ9nJvywjljFsNyOfmS4X-XN40HNjOY",
    authDomain: "refusion-14291.firebaseapp.com",
    projectId: "refusion-14291",
    storageBucket: "refusion-14291.appspot.com",
    messagingSenderId: "280595442717",
    appId: "1:280595442717:web:2858ba0c2ccc38cb366af4",
    measurementId: "G-86ZG27W57E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;