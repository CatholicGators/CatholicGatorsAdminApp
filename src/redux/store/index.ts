import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";

import firebase from "firebase/app";

import rootReducer from "../reducers";
import rootEpic from "../epics";
import Firestore from "../../database/firestore";
import devClientConfig from "../../config/clientConfig";
import testClientConfig from "../../config/testClientConfig";
import prodClientConfig from "../../config/prodClientConfig";
import InterestsService from "../../modules/admin/modules/interests/services/interestsService";
import ContactFormService from "../../modules/contactForm/services/contactFormService";
import UserService from "../../modules/app/modules/auth/services/userService";
import UserService2 from "../../modules/admin/modules/users/services/userService";
import FirestoreAdapter from "../../database/firestoreAdapter";
import AuthService from "../../modules/app/modules/auth/services/authService";

const config =
    JSON.stringify(process.env.REACT_APP_ENV_NAME) ===
    JSON.stringify("production")
        ? prodClientConfig
        : JSON.stringify(process.env.REACT_APP_ENV_NAME) ===
          JSON.stringify("test")
        ? testClientConfig
        : devClientConfig;

const app = !firebase.apps.length
    ? firebase.initializeApp(config)
    : firebase.app();
const db = app.firestore();
const auth = app.auth();

const firestoreAdapter = new FirestoreAdapter(db);
const firestore = new Firestore(app, db);
const userService = new UserService(firestore);
const userService2 = new UserService2(firestoreAdapter);
const authService = new AuthService(auth, userService2);
authService.listenForUser();
const interestsService = new InterestsService(firestoreAdapter);
const contactFormService = new ContactFormService(
    firestoreAdapter,
    interestsService
);

export type Dependencies = {
    firestore: Firestore;
    userService: UserService;
    userService2: UserService2;
    authService: AuthService;
    interestsService: InterestsService;
    contactFormService: ContactFormService;
};
const epicMiddleware = createEpicMiddleware({
    dependencies: {
        firestore,
        userService,
        userService2,
        authService,
        interestsService,
        contactFormService,
    },
});

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

export default store;
