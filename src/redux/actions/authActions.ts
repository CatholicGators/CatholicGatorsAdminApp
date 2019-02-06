const SET_USER = 'SET_USER';
const LOAD_FIREBASE = 'LOAD_FIREBASE';
const GOOGLE_SIGN_IN = 'GOOGLE_SIGN_IN';
const GOOGLE_SIGNED_IN = 'GOOGLE_SIGNED_IN';
const SIGN_OUT = 'SIGN_OUT';
const SIGNED_OUT = 'SIGNED_OUT';

export const authActions = {
    SET_USER,
    LOAD_FIREBASE,
    GOOGLE_SIGN_IN,
    GOOGLE_SIGNED_IN,
    SIGN_OUT,
    SIGNED_OUT
}

export function setUser(user) {
    return { type: SET_USER, user: user };
}

export function loadFirebase() {
    return { type: LOAD_FIREBASE };
}

export function googleSignIn() {
    return { type: GOOGLE_SIGN_IN };
}

export function signOut() {
    return { type: SIGN_OUT };
}

export function googleSignedIn() {
    return { type: GOOGLE_SIGNED_IN };
}

export function signedOut() {
    return { type: SIGNED_OUT };
}