import { combineEpics } from 'redux-observable';
import {
  loadFirebaseEpic,
  googleSignInEpic,
  googleSignOutEpic
} from './authEpics';

export const rootEpic = combineEpics(
  loadFirebaseEpic,
  googleSignInEpic,
  googleSignOutEpic
);