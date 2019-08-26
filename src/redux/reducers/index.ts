import { combineReducers } from 'redux'
import authReducer from './auth/authReducer'
import adminReducer from './admin/adminReducer'
import contactFormReducer from '../../modules/contactForm/redux/reducers/contactFormReducer'

export default combineReducers({
    auth: authReducer,
    contact: contactFormReducer,
    admin: adminReducer
})
