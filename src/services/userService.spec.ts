import { auth as firebaseAuth } from 'firebase/app';
import { of, throwError } from 'rxjs';
import { toArray, take } from 'rxjs/operators';

import UserService from './userService';
import { firestore, auth, authCallBacks, authErrCallBacks } from './testUtils/mockFirestore';

describe('UserService', () => {
    const USER_COLLECTION = 'users';

    let userService;

    beforeEach(() => {
        userService = new UserService(firestore);
        restoreMocks();
    });

    describe('constructor', () => {
        it(`gets the firestore's auth object`, () => {
            new UserService(firestore);

            expect(firestore.getAuth).toReturnWith(auth);
        });
    });

    describe('googleSignIn()', () => {
        it('uses GoogleAuthProvider for the redirect', done => {
            auth.signInWithRedirect.mockResolvedValue();

            userService.googleSignIn().subscribe(
                () => {
                    expect(auth.signInWithRedirect).toHaveBeenCalledWith(new firebaseAuth.GoogleAuthProvider());
                    done();
                }
            );
        });

        it('fires next then completes the observable', done => {
            auth.signInWithRedirect.mockResolvedValue();
            let resultCorrect = false;

            userService.googleSignIn()
                .subscribe(
                    result => {
                        resultCorrect = result === undefined;
                    },
                    () => {
                        done.fail('Observable returned error');
                    },
                    () => {
                        expect(resultCorrect).toBe(true);
                        done();
                    }
                );
        });

        it('passes the auth.signInWithRedirect(...) error to the observable', done => {
            const mockErr = 'test';
            auth.signInWithRedirect.mockRejectedValue(mockErr);

            userService.googleSignIn()
                .subscribe(
                    () => {
                        done.fail('Observable did not give error');
                    },
                    err => {
                        expect(err).toBe(mockErr);
                        done();
                    }
                );
        });
    });

    describe('signOut()', () => {
        it('calls auth.SignOut()', done => {
            auth.signOut.mockResolvedValue();

            userService.signOut()
                .subscribe(
                    () => {
                        expect(auth.signOut).toHaveBeenCalled();
                        done();
                    }
                );
        });

        it('fires next then completes the observable', done => {
            auth.signOut.mockResolvedValue();
            let resultCorrect = false;

            userService.signOut()
                .subscribe(
                    result => {
                        resultCorrect = result === undefined;
                    },
                    () => {
                        done.fail('Observable returned error');
                    },
                    () => {
                        expect(resultCorrect).toBe(true);
                        done();
                    }
                );
        });

        it('passes the auth.signOut() error to the observable', done => {
            const mockErr = 'test';
            auth.signOut.mockRejectedValue(mockErr);

            userService.signOut()
                .subscribe(
                    () => {
                        done.fail('Observable did not give error');
                    },
                    err => {
                        expect(err).toBe(mockErr);
                        done();
                    }
                );
        });
    });

    describe('listenForUser()', () => {
        it('emits user every time auth.onAuthStateChanged(...) calls its callback', done => {
            const userOne = {
                name: 'Ryan'
            }
            const userTwo = {
                name: 'MCP'
            }

            const users = [
                userOne,
                null,
                userTwo
            ];

            firestore.getDoc
                .mockReturnValueOnce(of(userOne))
                .mockReturnValueOnce(of(userTwo));
            firestore.doesExist
                .mockReturnValue(of(false))
            firestore.upsertDocById
                .mockReturnValue(of(undefined))

            userService.listenForUser()
                .pipe(
                    take(users.length),
                    toArray()
                ).subscribe(result => {
                    expect(result.length).toEqual(users.length);
                    done();
                });

            users.forEach(user =>
                authCallBacks.forEach(cb =>
                    cb(user)
                )
            );
        });

        it('passes the auth.onAuthStateChanged(...) error to the observable', done => {
            const err = 'test';

            userService.listenForUser()
                .subscribe(
                    () => {
                        done.fail('The error was not tripped');
                    },
                    result => {
                        expect(result).toBe(err)
                        done();
                    }
                );

            authErrCallBacks.forEach(cb => cb(err));
        });
    });

    describe('addUser()', () => {
        it('adds a user to the user collection', done => {
            const user = {
                name: 'Ryan'
            };

            firestore.addDoc.mockReturnValue(of({
                get: jest.fn(() => Promise.resolve({
                    id: 'id',
                    data: jest.fn(() => user)
                }))
            }));

            userService.addUser(user)
                .subscribe(
                    () => {
                        expect(firestore.addDoc).toHaveBeenCalledWith(USER_COLLECTION, user);
                        done();
                    }
                );
        });

        it('returns the user object', done => {
            const mockUser = {
                name: 'Ryan'
            };

            firestore.addDoc.mockReturnValue(of({
                get: jest.fn(() => Promise.resolve({
                    id: 'id',
                    data: jest.fn(() => mockUser)
                }))
            }));

            userService.addUser(mockUser)
                .subscribe(
                    user => {
                        expect(user).toEqual({id: 'id', ...mockUser});
                        done();
                    }
                );
        });

        it('passes the addDoc() error to the observable', done => {
            const user = {
                name: 'Ryan'
            };
            const mockErr = 'test';

            firestore.addDoc.mockReturnValue(throwError(mockErr));

            userService.addUser(user)
                .subscribe(
                    () => {
                        done.fail('Error was not tripped');
                    },
                    err => {
                        expect(err).toBe(mockErr);
                        done();
                    }
                );
        });
    });

    describe('addUsers()', () => {
        let mockUsers, expectedUsers;

        beforeEach(() => {
            mockUsers = [
                {
                    name: 'Ryan'
                },
                {
                    name: 'Joey'
                },
                {
                    name: 'MCP'
                }
            ];

            expectedUsers = mockUsers.map(x => ({ id: 'id', ...x }));

            firestore.upsertDocs.mockReturnValue(of([
                {
                    get: jest.fn(() => Promise.resolve({
                        id: 'id',
                        data: jest.fn(() => mockUsers[0])
                    }))
                },
                {
                    get: jest.fn(() => Promise.resolve({
                        id: 'id',
                        data: jest.fn(() => mockUsers[1])
                    }))
                },
                {
                    get: jest.fn(() => Promise.resolve({
                        id: 'id',
                        data: jest.fn(() => mockUsers[2])
                    }))
                }
            ]));
        });

        it('adds users to the user collection', done => {
            userService.addUsers(mockUsers)
                .subscribe(
                    () => {
                        expect(firestore.upsertDocs).toHaveBeenCalledWith(USER_COLLECTION, mockUsers);
                        done();
                    }
                );
        });

        it('returns back a list of users from database', done => {
            userService.addUsers(mockUsers)
                .subscribe(
                    users => {
                        expect(users).toEqual(expectedUsers);
                        done();
                    }
                );
        });

        it('passes the upsertDocs() error to the observable', done => {
            const mockErr = 'test';

            firestore.upsertDocs.mockReturnValue(throwError(mockErr));

            userService.addUsers(mockUsers)
                .subscribe(
                    () => {
                        done.fail('Error was not tripped');
                    },
                    err => {
                        expect(err).toBe(mockErr);
                        done();
                    }
                );
        });
    });

    describe('getUser()', () => {
        it('gets a user from the user collection', done => {
            const mockUser = {
                id: '0',
                name: 'Ryan'
            };

            firestore.getDoc.mockReturnValue(of(mockUser));

            userService.getUser(mockUser.id)
                .subscribe(
                    user => {
                        expect(firestore.getDoc).toHaveBeenCalledWith(USER_COLLECTION, mockUser.id);
                        expect(user).toBe(mockUser);
                        done();
                    }
                );
        });

        it('passes the getDoc() error to the observable', done => {
            const mockUser = {
                id: '0',
                name: 'Ryan'
            };
            const mockErr = 'test';

            firestore.getDoc.mockReturnValue(throwError(mockErr));

            userService.getUser(mockUser.id)
                .subscribe(
                    () => {
                        done.fail('Error was not tripped');
                    },
                    err => {
                        expect(err).toBe(mockErr);
                        done();
                    }
                );
        });
    });

    describe('getAllUsers()', () => {
        it('gets all users in the user collection', done => {
            const mockUsers = [{id: '0'}];

            firestore.getCollection.mockReturnValue(of(mockUsers));

            userService.getAllUsers()
                .subscribe(
                    users => {
                        expect(firestore.getCollection).toHaveBeenCalledWith(USER_COLLECTION);
                        expect(users).toBe(mockUsers);
                        done();
                    }
                );
        });

        it('passes the getCollection() error to the observable', done => {
            const mockErr = 'test';

            firestore.getCollection.mockReturnValue(throwError(mockErr));

            userService.getAllUsers()
                .subscribe(
                    () => {
                        done.fail('Error was not tripped');
                    },
                    err => {
                        expect(err).toBe(mockErr);
                        done();
                    }
                );
        });
    });

    describe('updateUser()', () => {
        let id, mockUpdate;

        beforeEach(() => {
            id = '0';
            mockUpdate = {
                name: 'Joey'
            };

            firestore.updateDoc.mockReturnValue(of({
                get: jest.fn(() => Promise.resolve({
                    id,
                    data: jest.fn(() => mockUpdate)
                }))
            }));
        });

        it('update a user in the user collection', done => {
            userService.updateUser(id, mockUpdate)
                .subscribe(
                    _ => {
                        expect(firestore.updateDoc).toHaveBeenCalledWith(USER_COLLECTION, id, mockUpdate);
                        done();
                    }
                );
        });

        it('returns the user object after update', done => {
            userService.updateUser(id, mockUpdate)
                .subscribe(
                    user => {
                        expect(user).toEqual({id, ...mockUpdate});
                        done();
                    }
                );
        });

        it('passes the updateDoc() error to the observable', done => {
            const mockErr = 'test';

            firestore.updateDoc.mockReturnValue(throwError(mockErr));

            userService.updateUser(id, mockUpdate)
                .subscribe(
                    _ => {
                        done.fail('Error was not tripped');
                    },
                    err => {
                        expect(err).toBe(mockErr);
                        done();
                    }
                );
        });
    });

    describe('updateUsers()', () => {
        let mockUpdates, expectedUsers;

        beforeEach(() => {
            mockUpdates = [
                {
                    id: '0',
                    name: 'Ryan'
                },
                {
                    id: '1',
                    name: 'Joey'
                },
                {
                    id: '2',
                    name: 'MCP'
                }
            ]

            expectedUsers = mockUpdates.map(x => ({ id: 'id', ...x }));

            firestore.updateDocs.mockReturnValue(of([
                {
                    get: jest.fn(() => Promise.resolve({
                        id: mockUpdates[0].id,
                        data: jest.fn(() => ({ name: mockUpdates[0].name }))
                    }))
                },
                {
                    get: jest.fn(() => Promise.resolve({
                        id: mockUpdates[1].id,
                        data: jest.fn(() => ({ name: mockUpdates[1].name }))
                    }))
                },
                {
                    get: jest.fn(() => Promise.resolve({
                        id: mockUpdates[2].id,
                        data: jest.fn(() => ({ name: mockUpdates[2].name }))
                    }))
                }
            ]));
        });

        it('updates users in the user collection', done => {
            userService.updateUsers(mockUpdates)
                .subscribe(
                    () => {
                        expect(firestore.updateDocs).toHaveBeenCalledWith(USER_COLLECTION, mockUpdates);
                        done();
                    }
                );
        });

        it('returns users after updating', done => {
            userService.updateUsers(mockUpdates)
                .subscribe(
                    users => {
                        expect(users).toEqual(expectedUsers);
                        done();
                    }
                );
        });

        it('passes the updateDocs() error to the observable', done => {
            const mockErr = 'test';

            firestore.updateDocs.mockReturnValue(throwError(mockErr));

            userService.updateUsers(mockUpdates)
                .subscribe(
                    () => {
                        done.fail('Error was not tripped');
                    },
                    err => {
                        expect(err).toBe(mockErr);
                        done();
                    }
                );
        });
    });

    // TODO: write updateUserApproval and updateUsersApproval tests

    describe('approveUser()', () => {
        it('updates a user to be approved in the user collection', done => {
            const id = '0';

            firestore.updateDoc.mockReturnValue(of({
                get: jest.fn(() => Promise.resolve({
                    id: 'id',
                    data: jest.fn(() => {})
                }))
            }));

            userService.approveUser(id)
                .subscribe(
                    _ => {
                        expect(firestore.updateDoc).toHaveBeenCalledWith(
                            USER_COLLECTION,
                            id,
                            {
                                isApproved: true
                            }
                        );
                        done();
                    }
                );
        });
    });

    describe('approveUsers()', () => {
        let ids, expectedUsers;
        
        beforeEach(() => {
            ids = ['0', '1', '2'];

            expectedUsers = ids.map(id => ({
                id,
                isApproved: true
            }));

            firestore.updateDocs.mockReturnValue(of([
                {
                    get: jest.fn(() => Promise.resolve({
                        id: ids[0],
                        data: jest.fn(() => ({ isApproved: true }))
                    }))
                },
                {
                    get: jest.fn(() => Promise.resolve({
                        id: ids[1],
                        data: jest.fn(() => ({ isApproved: true }))
                    }))
                },
                {
                    get: jest.fn(() => Promise.resolve({
                        id: ids[2],
                        data: jest.fn(() => ({ isApproved: true }))
                    }))
                }
            ]));
        });

        it('updates users to be approved in the user collection', done => {
            userService.approveUsers(ids)
                .subscribe(
                    _ => {
                        expect(firestore.updateDocs).toHaveBeenCalledWith(
                            USER_COLLECTION,
                            [
                                {
                                    id: '0',
                                    isApproved: true
                                },
                                {
                                    id: '1',
                                    isApproved: true
                                },
                                {
                                    id: '2',
                                    isApproved: true
                                },
                            ]
                        );
                        done();
                    }
                );
        });

        it('returns updated users', done => {
            userService.approveUsers(ids)
                .subscribe(
                    users => {
                        expect(users).toEqual(expectedUsers);
                        done();
                    }
                );
        });
    });

    describe('disapproveUser()', () => {
        it('updates a user to be disapproved in the user collection', done => {
            const id = '0';

            firestore.updateDoc.mockReturnValue(of({
                get: jest.fn(() => Promise.resolve({
                    id: 'id',
                    data: jest.fn(() => {})
                }))
            }));

            userService.disapproveUser(id)
                .subscribe(
                    _ => {
                        expect(firestore.updateDoc).toHaveBeenCalledWith(
                            USER_COLLECTION,
                            id,
                            {
                                isApproved: false
                            }
                        );
                        done();
                    }
                );
        });
    });

    describe('disapproveUsers()', () => {
        let ids, expectedUsers;

        beforeEach(() => {
            ids = ['0', '1', '2'];

            expectedUsers = ids.map(id => ({
                id,
                isApproved: false
            }));

            firestore.updateDocs.mockReturnValue(of([
                {
                    get: jest.fn(() => Promise.resolve({
                        id: ids[0],
                        data: jest.fn(() => ({ isApproved: false }))
                    }))
                },
                {
                    get: jest.fn(() => Promise.resolve({
                        id: ids[1],
                        data: jest.fn(() => ({ isApproved: false }))
                    }))
                },
                {
                    get: jest.fn(() => Promise.resolve({
                        id: ids[2],
                        data: jest.fn(() => ({ isApproved: false }))
                    }))
                }
            ]));
        });

        it('updates users to be not approved in the user collection', done => {
            userService.disapproveUsers(ids)
                .subscribe(
                    _ => {
                        expect(firestore.updateDocs).toHaveBeenCalledWith(
                            USER_COLLECTION,
                            [
                                {
                                    id: '0',
                                    isApproved: false
                                },
                                {
                                    id: '1',
                                    isApproved: false
                                },
                                {
                                    id: '2',
                                    isApproved: false
                                },
                            ]
                        );
                        done();
                    }
                );
        });

        it('returns updated users', done => {
            userService.approveUsers(ids)
                .subscribe(
                    users => {
                        expect(users).toEqual(expectedUsers);
                        done();
                    }
                );
        });
    });
    
    // TODO: write updateUserAdminStatus and updateUsersAdminStatus tests

    describe('makeAdmin()', () => {
        it('updates a user to be an admin in the user collection', done => {
            const id = '0';

            firestore.updateDoc.mockReturnValue(of({
                get: jest.fn(() => Promise.resolve({
                    id: 'id',
                    data: jest.fn(() => {})
                }))
            }));

            userService.makeAdmin(id)
                .subscribe(
                    _ => {
                        expect(firestore.updateDoc).toHaveBeenCalledWith(
                            USER_COLLECTION,
                            id,
                            {
                                isAdmin: true
                            }
                        );
                        done();
                    }
                );
        });
    });

    describe('makeAdmins()', () => {
        let ids, expectedUsers;

        beforeEach(() => {
            ids = ['0', '1', '2'];

            expectedUsers = ids.map(id => ({
                id,
                isAdmin: true
            }));

            firestore.updateDocs.mockReturnValue(of([
                {
                    get: jest.fn(() => Promise.resolve({
                        id: ids[0],
                        data: jest.fn(() => ({ isAdmin: true }))
                    }))
                },
                {
                    get: jest.fn(() => Promise.resolve({
                        id: ids[1],
                        data: jest.fn(() => ({ isAdmin: true }))
                    }))
                },
                {
                    get: jest.fn(() => Promise.resolve({
                        id: ids[2],
                        data: jest.fn(() => ({ isAdmin: true }))
                    }))
                }
            ]));

        })

        it('updates users to be admins in the user collection', done => {
            userService.makeAdmins(ids)
                .subscribe(
                    _ => {
                        expect(firestore.updateDocs).toHaveBeenCalledWith(
                            USER_COLLECTION,
                            [
                                {
                                    id: '0',
                                    isAdmin: true
                                },
                                {
                                    id: '1',
                                    isAdmin: true
                                },
                                {
                                    id: '2',
                                    isAdmin: true
                                },
                            ]
                        );
                        done();
                    }
                );
        });

        it('returns updated users', done => {
            userService.makeAdmins(ids)
                .subscribe(
                    users => {
                        expect(users).toEqual(expectedUsers);
                        done();
                    }
                );
        });
    });

    describe('removeAdmin()', () => {
        it('updates a user to no longer be an admin in the user collection', done => {
            const id = '0';

            firestore.updateDoc.mockReturnValue(of({
                get: jest.fn(() => Promise.resolve({
                    id: 'id',
                    data: jest.fn(() => {})
                }))
            }));

            userService.removeAdmin(id)
                .subscribe(
                    _ => {
                        expect(firestore.updateDoc).toHaveBeenCalledWith(
                            USER_COLLECTION,
                            id,
                            {
                                isAdmin: false
                            }
                        );
                        done();
                    }
                );
        });
    });

    describe('removeAdmins()', () => {
        let ids, expectedUsers;

        beforeEach(() => {
            ids = ['0', '1', '2'];

            expectedUsers = ids.map(id => ({
                id,
                isAdmin: false
            }));

            firestore.updateDocs.mockReturnValue(of([
                {
                    get: jest.fn(() => Promise.resolve({
                        id: ids[0],
                        data: jest.fn(() => ({ isAdmin: false }))
                    }))
                },
                {
                    get: jest.fn(() => Promise.resolve({
                        id: ids[1],
                        data: jest.fn(() => ({ isAdmin: false }))
                    }))
                },
                {
                    get: jest.fn(() => Promise.resolve({
                        id: ids[2],
                        data: jest.fn(() => ({ isAdmin: false }))
                    }))
                }
            ]));
        });

        it('updates users to not be admins in the user collection', done => {
            userService.removeAdmins(ids)
                .subscribe(
                    _ => {
                        expect(firestore.updateDocs).toHaveBeenCalledWith(
                            USER_COLLECTION,
                            [
                                {
                                    id: '0',
                                    isAdmin: false
                                },
                                {
                                    id: '1',
                                    isAdmin: false
                                },
                                {
                                    id: '2',
                                    isAdmin: false
                                },
                            ]
                        );
                        done();
                    }
                );
        });

        it('returns updated users', done => {
            userService.removeAdmins(ids)
                .subscribe(
                    users => {
                        expect(users).toEqual(expectedUsers);
                        done();
                    }
                );
        });
    });

    describe('deleteUser()', () => {
        it('deletes a user in the user collection', done => {
            const id = '0';

            firestore.deleteDoc.mockReturnValue(of(undefined));

            userService.deleteUser(id)
                .subscribe(
                    _ => {
                        expect(firestore.deleteDoc).toHaveBeenCalledWith(USER_COLLECTION, id);
                        done();
                    },
                    _ => {
                        done.fail('Error was not tripped');
                    },
                );
        });

        it('passes the deleteDoc() error to the observable', done => {
            const id = '0';
            const mockErr = 'test';

            firestore.deleteDoc.mockReturnValue(throwError(mockErr));

            userService.deleteUser(id)
                .subscribe(
                    _ => {
                        done.fail('Error was not tripped');
                    },
                    err => {
                        expect(err).toBe(mockErr);
                        done();
                    }
                );
        });
    });

    describe('deleteUsers()', () => {
        const users = [
            {
                id: '0'
            },
            {
                id: '1'
            },
            {
                id: '2'
            }
        ];

        it('deletes users in the user collection', done => {
            firestore.deleteDocs.mockReturnValue(of([{}]));

            userService.deleteUsers(users)
                .subscribe(
                    () => {
                        expect(firestore.deleteDocs).toHaveBeenCalledWith(USER_COLLECTION, users);
                        done();
                    }
                );
        });

        it('passes the deleteDocs() error to the observable', done => {
            const mockErr = 'test';

            firestore.deleteDocs.mockReturnValue(throwError(mockErr));

            userService.deleteUsers(users)
                .subscribe(
                    () => {
                        done.fail('Error was not tripped');
                    },
                    err => {
                        expect(err).toBe(mockErr);
                        done();
                    }
                );
        });
    });

});

function restoreMocks() {
    jest.clearAllMocks();
}
