import { combineReducers } from "redux";
import authReducer from "modules/app/modules/auth/redux/reducers/authReducer";
import adminReducer from "modules/admin/redux/reducers";
import contactFormReducer from "modules/contactForm/redux/reducers/contactFormReducer";

export default combineReducers({
    auth: authReducer,
    contact: contactFormReducer,
    admin: adminReducer,
});
