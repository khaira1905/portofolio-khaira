import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5F-KidFFwc4abncZHQvRGat48EihwjTc",
  authDomain: "portofolio-khaira.firebaseapp.com",
  projectId: "portofolio-khaira",
  storageBucket: "portofolio-khaira.firebasestorage.app",
  messagingSenderId: "1034553483820",
  appId: "1:1034553483820:web:a65789e72a7cb16db36789",
  measurementId: "G-414Q9WVEV7"
};

const app = initializeApp(firebaseConfig);

// BAGIAN PENTING: Jangan sampai lupa baris-baris export di bawah ini!
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);