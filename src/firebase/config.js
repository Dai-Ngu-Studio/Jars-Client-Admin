import firebase from "firebase";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5L_wWWaZCuO-tFNX8S5Gsrnk-K2ZkP4w",
  authDomain: "jars-c19f8.firebaseapp.com",
  projectId: "jars-c19f8",
  storageBucket: "jars-c19f8.appspot.com",
  messagingSenderId: "870032839384",
  appId: "1:870032839384:web:69cf3a9e1355e16782bdad",
  measurementId: "G-Q0TLTHP5F1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };
export default firebase;
