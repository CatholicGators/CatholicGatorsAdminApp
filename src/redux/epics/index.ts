import { combineEpics } from 'redux-observable';
import contactFormEpics from './contactForm/contactFormEpic'
import authEpics from './auth/authEpics';
import adminEpics from './admin/adminEpics';

export default combineEpics(
  authEpics,
  contactFormEpics,
  adminEpics
);
