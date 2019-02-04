import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const clientCreds = {
  apiKey: process.env.FIREBASE_CLIENT_API_KEY,
  authDomain: process.env.FIREBASE_CLIENT_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_CLIENT_DATABASE_URL,
  projectId: process.env.FIREBASE_CLIENT_PROJECT_ID,
  storageBucket: process.env.FIREBASE_CLIENT_STOREAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_CLIENT_MESSAGING_SENDER_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCreds);
}

const firestore = firebase.firestore();
const auth = firebase.auth();

export { firestore, auth };
