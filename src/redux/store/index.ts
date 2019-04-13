import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import * as firebase from 'firebase/app';

import rootReducer from '../reducers';
import rootEpic from '../epics';
import Firestore from '../../database/firestore';
import UserService from '../../services/userService';
import devClientConfig from '../../config/clientConfig';
import prodClientConfig from '../../config/prodClientConfig'

const firestore = (process.env.NODE_ENV === "production" ? new Firestore(firebase, prodClientConfig) : new Firestore(firebase, devClientConfig));
const userService = new UserService(firestore);

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    firestore,
    userService
  }
});

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);

export default store;
