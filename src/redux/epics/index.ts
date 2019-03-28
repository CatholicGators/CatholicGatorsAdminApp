import { combineEpics } from 'redux-observable';
import authEpics from './auth/authEpics';
import adminEpics from './admin/adminEpics';

export default combineEpics(
  authEpics,
  adminEpics
);
