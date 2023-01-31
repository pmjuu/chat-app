import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDjnuE0rW2cYisZQD4JYSWkzLWEeHhZC_g",
  authDomain: "chat-app-157a9.firebaseapp.com",
  projectId: "chat-app-157a9",
  storageBucket: "chat-app-157a9.appspot.com",
  messagingSenderId: "756889794184",
  appId: "1:756889794184:web:fb818a250f2753b190513d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
