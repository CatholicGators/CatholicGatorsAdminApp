import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import * as firebase from 'firebase/app';

import rootReducer from '../reducers';
import rootEpic from '../epics';
import Firestore from '../../database/firestore';

const clientConfig = {
  apiKey: "AIzaSyDCDeYDMBWkNDv6vYHvliK75FZIYeui8go",
  authDomain: "catholic-gators-dev.firebaseapp.com",
  databaseURL: "https://catholic-gators-dev.firebaseio.com",
  projectId: "catholic-gators-dev",
  storageBucket: "catholic-gators-dev.appspot.com",
  messagingSenderId: "1019003476611"
};

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    firestore: new Firestore(firebase, clientConfig)
  }
});

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);

export default store;
