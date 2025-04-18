import firebase from "firebase/app";
import "firebase/auth";

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_API_KEY,
  authDomain: import.meta.env.VITE_API_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_API_PROJECT_ID,
  storageBucket: import.meta.env.VITE_API_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_API_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_API_APP_ID,
  measurementId: import.meta.env.VITE_API_MEASUREMENT_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBqQ1MTUjYCPF-ObpykYDHIm_9tIoT9g7E",
//   authDomain: "shikimory-92474.firebaseapp.com",
//   projectId: "shikimory-92474",
//   storageBucket: "shikimory-92474.firebasestorage.app",
//   messagingSenderId: "576157575250",
//   appId: "1:576157575250:web:7d4c54103b0f4f6c2f578b",
//   measurementId: "G-QJZ71PF3V9",
// };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;

// const app = initializeApp(firebaseConfig);

export const db = firebase.firestore();
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();
