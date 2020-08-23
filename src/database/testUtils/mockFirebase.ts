let clientConfig, firebase, app, db, batch, collectionReference, reference

clientConfig = "test"
reference = {
    add: jest.fn(),
    set: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
}

collectionReference = {
    doc: jest.fn((docId) => reference),
    ...reference,
}
batch = {
    set: jest.fn(),
    commit: jest.fn(),
}

db = {
    collection: jest.fn(() => collectionReference),
    batch: jest.fn(() => batch),
}

class App {
    isDeleted_ = false;
    auth = jest.fn();
    firestore = jest.fn(() => {
        return db
    });
    delete = jest.fn(() => {
        this.isDeleted_ = true
        return Promise.resolve()
    });
}

firebase = {
    apps: [],
    initializeApp: jest.fn(() => {
        app = new App()
        firebase.apps.push(app)
        return app
    }),
    app: jest.fn(() => {
        return firebase.apps[0]
    }),
}

export {
    clientConfig,
    firebase,
    app,
    db,
    batch,
    collectionReference,
    reference,
}
