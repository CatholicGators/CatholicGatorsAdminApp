import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from '../reducers';
import rootEpic from '../epics';
import Firestore from '../../database/firestore';

const initStore = () => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: { firestore: new Firestore() }
  });

  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  );

  epicMiddleware.run(rootEpic);

  return store;
};

export default initStore;
