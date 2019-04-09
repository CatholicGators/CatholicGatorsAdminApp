import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import adminReducer from './admin/adminReducer';

export default combineReducers({
  auth: authReducer,
  contactForm: contactFormReducer,
  admin: adminReducer
});
