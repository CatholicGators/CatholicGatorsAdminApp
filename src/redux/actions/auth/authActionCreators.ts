import authActions from './authActions';

export function setUser(user) {
    return { type: authActions.SET_USER, user: user };
}

export function listenForUser() {
    return { type: authActions.LISTEN_FOR_USER };
}

export function googleSignIn() {
    return { type: authActions.GOOGLE_SIGN_IN };
}

export function signOut() {
    return { type: authActions.SIGN_OUT };
}

export function googleSignedIn() {
    return { type: authActions.GOOGLE_SIGNED_IN };
}

export function signedOut() {
    return { type: authActions.SIGNED_OUT };
}