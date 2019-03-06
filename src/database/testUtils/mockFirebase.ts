let clientConfig,
    firebase,
    app,
    auth,
    authCallBacks,
    authErrCallBacks,
    reference;

authCallBacks = [];
authErrCallBacks = [];

clientConfig = "test";
reference = {
    add: jest.fn(),
    set: jest.fn(),
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
        authCallBacks.push(cb);
        authErrCallBacks.push(errcb);
    }),
    signInWithRedirect: jest.fn(),
    signOut: jest.fn()
};
class App {
    isDeleted_ = false;
    auth = jest.fn(() => {
        return auth;
    });
    firestore = jest.fn(() => {
        return db;
    });
    delete = jest.fn(() => {
        this.isDeleted_ = true;
        return Promise.resolve();
    });
}

app = new App();
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

export { clientConfig, firebase, app, auth, authCallBacks, authErrCallBacks, reference }
