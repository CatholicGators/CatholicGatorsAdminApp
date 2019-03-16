import { combineEpics } from 'redux-observable';
import authEpics from './auth/authEpics';
import contactFormEpics from './contactForm/contactFormEpic'

export default combineEpics(
  authEpics,
  contactFormEpics
);
