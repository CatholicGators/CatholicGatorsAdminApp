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

    describe('addUser', () => {
        it('adds a user to the user collection', done => {
            const user = {
                name: 'Ryan'
            };

            firestore.addDoc.mockReturnValue(of({}));

            userService.addUser(user)
                .subscribe(
                    () => {
                        expect(firestore.addDoc).toHaveBeenCalledWith(USER_COLLECTION, user);
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
        it('update a user in the user collection', done => {
            const id = '0';
            const update = {
                name: 'Joey'
            };

            firestore.updateDoc.mockReturnValue(of(undefined));

            userService.updateUser(id, update)
                .subscribe(
                    _ => {
                        expect(firestore.updateDoc).toHaveBeenCalledWith(USER_COLLECTION, id, update);
                        done();
                    }
                );
        });

        it('passes the updateDoc() error to the observable', done => {
            const id = '0';
            const update = {
                name: 'Joey'
            };
            const mockErr = 'test';

            firestore.updateDoc.mockReturnValue(throwError(mockErr));

            userService.updateUser(id, update)
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

    describe('approveUser()', () => {
        it('updates a user to be approved in the user collection', done => {
            const id = '0';

            firestore.updateDoc.mockReturnValue(of(undefined));

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

    describe('disapproveUser()', () => {
        it('updates a user to be disapproved in the user collection', done => {
            const id = '0';

            firestore.updateDoc.mockReturnValue(of(undefined));

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

    describe('makeAdmin()', () => {
        it('updates a user to be an admin in the user collection', done => {
            const id = '0';

            firestore.updateDoc.mockReturnValue(of(undefined));

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

    describe('removeAdmin()', () => {
        it('updates a user to no longer be an admin in the user collection', done => {
            const id = '0';

            firestore.updateDoc.mockReturnValue(of(undefined));

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
});

function restoreMocks() {
    auth.signInWithRedirect.mockRestore();
    auth.signOut.mockRestore();
    firestore.getDoc.mockRestore();
    firestore.doesExist.mockRestore();
    firestore.upsertDocById.mockRestore();
    firestore.addDoc.mockRestore();
    firestore.getCollection.mockRestore();
    firestore.updateDoc.mockRestore();
    firestore.deleteDoc.mockRestore();
}
