let clientConfig,
    firebase,
    app,
    reference;

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

class App {
    isDeleted_ = false;
    auth = jest.fn();
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

export { clientConfig, firebase, app, reference }
