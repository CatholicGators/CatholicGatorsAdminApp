let clientConfig,
    firebase,
    app,
    auth,
    authCallBack,
    authErrCallBack,
    reference;

clientConfig = "test";
reference = {
    add: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
};
const collectionReference = {
    doc: (docId) => { return reference },
        ...reference
};
const collection = () => {
    return collectionReference;
};
const db = {
    collection
};

auth = {
    onAuthStateChanged: jest.fn((cb, errcb) => {
        authCallBack = cb;
        authErrCallBack = errcb;
    }),
    signInWithRedirect: jest.fn(),
    signOut: jest.fn()
};
app = {
    auth: jest.fn(() => {
        return auth;
    }),
    firestore: jest.fn(() => {
        return db;
    })
};
firebase = {
    apps: [],
    initializeApp: jest.fn(() => {
        firebase.apps.push(app);
        return app;
    }),
    app: jest.fn(() => {
        return app;
    })
};

export { clientConfig, firebase, app, auth, authCallBack, authErrCallBack, reference }
