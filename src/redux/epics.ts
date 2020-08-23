import { combineEpics } from "redux-observable"
import contactFormEpics from "modules/contactForm/redux/epics/contactFormEpics"
import authEpics from "modules/app/modules/auth/redux/epics/authEpics"
import adminEpics from "modules/admin/redux/epics"

export default combineEpics(authEpics, contactFormEpics, adminEpics)
