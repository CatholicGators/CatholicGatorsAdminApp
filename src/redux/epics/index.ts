import { combineEpics } from 'redux-observable';
import contactFormEpics from './contactForm/contactFormEpic'
import authEpics from './auth/authEpics';

export default combineEpics(
  authEpics,
  contactFormEpics
);
