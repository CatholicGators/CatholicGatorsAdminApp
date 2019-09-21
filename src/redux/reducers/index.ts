import { combineReducers } from 'redux'
import authReducer from './auth/authReducer'
import adminReducer from '../../modules/admin/redux/reducers/adminReducer'
import contactFormReducer from '../../modules/contactForm/redux/reducers/contactFormReducer'
import interestsReducer from '../../modules/admin/modules/interests/redux/reducers/interestsReducer'

export default combineReducers({
    auth: authReducer,
    contact: contactFormReducer,
    admin: adminReducer,
    interests: interestsReducer
})
