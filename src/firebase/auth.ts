import firebase from 'firebase/app'
import { auth } from './firebase';

// Sign In
export const doSignInWithGoogleAccount = () =>
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

// Sign out
export const doSignOut = () =>
    auth.signOut();
