import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
console.log("heloooo");
console.log(import.meta.env.VITE_API_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_API_KEY,
  authDomain: import.meta.env.VITE_API_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_API_PROJECT_ID,
  storageBucket: import.meta.env.VITE_API_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_API_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_API_APP_ID,
  measurementId: import.meta.env.VITE_API_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
