import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// TODO: get these configs from somewhere else (env vars or config file)
const prodConfig = {
  apiKey: "AIzaSyAy_mXfE3IRoX_G3NpHazneLc8AXYI_aCI",
  authDomain: "catholic-gators.firebaseapp.com",
  databaseURL: "https://catholic-gators.firebaseio.com",
  projectId: "catholic-gators",
  storageBucket: "catholic-gators.appspot.com",
  messagingSenderId: "749371573275"
};

const devConfig = {
  apiKey: "AIzaSyDCDeYDMBWkNDv6vYHvliK75FZIYeui8go",
  authDomain: "catholic-gators-dev.firebaseapp.com",
  databaseURL: "https://catholic-gators-dev.firebaseio.com",
  projectId: "catholic-gators-dev",
  storageBucket: "catholic-gators-dev.appspot.com",
  messagingSenderId: "1019003476611"
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firestore = firebase.database();
const auth = firebase.auth();

export { firestore, auth };
