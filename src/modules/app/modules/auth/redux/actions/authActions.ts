export const authActions = {
    LISTEN_FOR_USER: "LISTEN_FOR_USER",
    SET_USER: "SET_USER",
    LISTEN_FOR_USER_ERR: "LISTEN_FOR_USER_ERR",
    GOOGLE_SIGN_IN: "GOOGLE_SIGN_IN",
    GOOGLE_SIGNED_IN: "GOOGLE_SIGNED_IN",
    GOOGLE_SIGN_IN_ERR: "GOOGLE_SIGN_IN_ERR",
    SIGN_OUT: "SIGN_OUT",
    SIGNED_OUT: "SIGNED_OUT",
    SIGN_OUT_ERR: "SIGN_OUT_ERR",
};

export function listenForUser() {
    return { type: authActions.LISTEN_FOR_USER };
}

export function setUser(user) {
    return { type: authActions.SET_USER, user };
}

export function listenForUserErr(err) {
    return { type: authActions.LISTEN_FOR_USER_ERR, err };
}

export function googleSignIn() {
    return { type: authActions.GOOGLE_SIGN_IN };
}

export function googleSignedIn() {
    return { type: authActions.GOOGLE_SIGNED_IN };
}

export function googleSignInErr(err) {
    return { type: authActions.GOOGLE_SIGN_IN_ERR, err };
}

export function signOut() {
    return { type: authActions.SIGN_OUT };
}

export function signedOut() {
    return { type: authActions.SIGNED_OUT };
}

export function signOutErr(err) {
    return { type: authActions.SIGN_OUT_ERR, err };
}
