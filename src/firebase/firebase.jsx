import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig ={
  apiKey: "AIzaSyBev70oFUGelFMe_QTQY7AzpEc0LUy--lc",
  authDomain: "solara-ver2.firebaseapp.com",
  projectId: "solara-ver2",
  storageBucket: "solara-ver2.firebasestorage.app",
  messagingSenderId: "733503748800",
  appId: "1:733503748800:web:a1ff93ae138cd7076f0b25",
  measurementId: "G-0TH3DBM3TE"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



export {db, auth}

