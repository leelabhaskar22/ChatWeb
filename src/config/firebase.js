
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore}  from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAdzq1rEAEhZ8-2IH6OWs6kCNwip6Od8WM",
  authDomain: "test-4351b.firebaseapp.com",
  projectId: "test-4351b",
  storageBucket: "test-4351b.appspot.com",
  messagingSenderId: "1093523192578",
  appId: "1:1093523192578:web:c04cbb4c41eda13002601b"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db}