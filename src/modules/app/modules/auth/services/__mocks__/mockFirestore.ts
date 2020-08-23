let firestore,
    auth,
    authCallBacks,
    authErrCallBacks,
    reference

authCallBacks = []
authErrCallBacks = []

auth = {
    onAuthStateChanged: jest.fn((cb, errcb) => {
        authCallBacks.push(cb)
        authErrCallBacks.push(errcb)
    }),
    signInWithRedirect: jest.fn(),
    signOut: jest.fn()
}

firestore = {
    getAuth: jest.fn(() => auth),
    addDoc: jest.fn(),
    upsertDocById: jest.fn(),
    upsertDocs: jest.fn(),
    getDoc: jest.fn(),
    getCollection: jest.fn(),
    doesExist: jest.fn(),
    updateDoc: jest.fn(),
    updateDocs: jest.fn(),
    deleteDoc: jest.fn(),
    deleteDocs: jest.fn()
}

export { firestore, auth, authCallBacks, authErrCallBacks, reference }
