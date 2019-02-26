import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import contactFormReducer from './contactForm/contactFormReducer'

export default combineReducers({
  auth: authReducer,
  contactForm: contactFormReducer
});
