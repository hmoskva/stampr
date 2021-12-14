import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PUBLIC_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// const history = window.history;
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { db, auth, provider, storage };
export default firebase;
