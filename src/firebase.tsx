import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgAif9-jAK7uL6d656vUfWBbIUg0VVjnM",
  authDomain: "kwaai-pai.firebaseapp.com",
  projectId: "kwaai-pai",
  storageBucket: "kwaai-pai.appspot.com",
  messagingSenderId: "953444075094",
  appId: "1:953444075094:web:a3861acd7ed2572bf41df7",
  measurementId: "G-6VDZKE68MH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };