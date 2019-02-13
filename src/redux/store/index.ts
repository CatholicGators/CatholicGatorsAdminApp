import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import * as firebase from 'firebase/app';

import rootReducer from '../reducers';
import rootEpic from '../epics';
import Firestore from '../../database/firestore';


const clientConfig = require(`../../../${process.env.FIREBASE_CLIENT_CONFIG}`);

const initStore = () => {
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

  return store;
};

export default initStore;
