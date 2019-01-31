import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import clientCreds from '../../credentials/client';

const config = clientCreds[process.env.NODE_ENV];

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firestore = firebase.database();
const auth = firebase.auth();

export { firestore, auth };
