import { combineEpics } from 'redux-observable';
import authEpics from './auth/authEpics';

export default combineEpics(
  authEpics
);
