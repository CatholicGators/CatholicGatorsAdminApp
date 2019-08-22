import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import * as firebase from 'firebase/app';

import rootReducer from '../reducers';
import rootEpic from '../epics';
import Firestore from '../../database/firestore';
import UserService from '../../services/userService';
import devClientConfig from '../../config/clientConfig';
import prodClientConfig from '../../config/prodClientConfig'
import InterestsService from '../../services/interestsService';
import ContactFormService from '../../services/contactFormService';

const config = (JSON.stringify(process.env.NODE_ENV) === JSON.stringify("production")) ? prodClientConfig : devClientConfig

const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
const db = app.firestore()

const firestore = new Firestore(app, db)
const userService = new UserService(firestore)
const interestsService = new InterestsService(db)
const contactFormService = new ContactFormService(db)

export type Dependencies = {
  firestore: Firestore
  userService: UserService
  interestsService: InterestsService,
  contactFormService: ContactFormService
}
const epicMiddleware = createEpicMiddleware({
  dependencies: {
    firestore,
    userService,
    interestsService,
    contactFormService
  }
});

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);

export default store;
