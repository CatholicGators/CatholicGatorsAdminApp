import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const clientCreds = require(`../../${process.env.FIREBASE_CLIENT_CONFIG}`);

if (!firebase.apps.length) {
  firebase.initializeApp(clientCreds);
}

const firestore = firebase.firestore();
const auth = firebase.auth();

export { firestore, auth };
