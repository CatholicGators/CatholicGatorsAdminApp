import Firestore from '../firestore';
import { toArray } from 'rxjs/operators';

describe('firestore', () => {
    let clientConfig,
        firebase,
        app,
        auth,
        authCallBack,
        firestore;

    beforeEach(() => {
        clientConfig = "test";
        auth = {
            onAuthStateChanged: jest.fn(cb => {
                authCallBack = cb;
            })
        }
        app = {
            auth: jest.fn(() => {
                return auth;
            })
        };
        firebase = {
            apps: [],
            initializeApp: jest.fn(() => {
                firebase.apps.push(app);
                return app
            }),
            app: jest.fn(() => {
                return app;
            })
        };

        firestore = new Firestore(firebase, clientConfig);
    });

    describe('constructor', () => {
        it('initializes firebase app only once', () => {
            expect(firebase.initializeApp).toHaveBeenCalledTimes(1);
            expect(firebase.initializeApp).toHaveBeenLastCalledWith(clientConfig);
            expect(firebase.app).not.toHaveBeenCalled();

            firestore = new Firestore(firebase, clientConfig);

            expect(firebase.initializeApp).toHaveBeenCalledTimes(1);
            expect(firebase.app).toHaveBeenCalledTimes(1);
        });

        it('initializes the app\'s auth', () => {
            let firestore = new Firestore(firebase, clientConfig);

            expect(app.auth).toHaveBeenCalled();
        });
    });

    describe('listenForUser()', () => {
        it('calls auth.onAuthStateChanged(...) every time and returns the user', () => {
            const users = [
                {
                    name: "Ryan",
                },
                null,
                {
                    name: "MCP"
                }
            ];

            const $user = firestore.listenForUser()
                .pipe(toArray());
            
            users.forEach(user => {
                authCallBack(user);
            });
            
            return $user
                .toPromise()
                .then(result => {
                    expect(result).toEqual(users);
                });
        });
    });
});