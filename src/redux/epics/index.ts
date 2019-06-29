import { combineEpics } from "redux-observable";
import contactFormEpics from "./contactForm/contactFormEpics";
import authEpics from "./auth/authEpics";
import adminEpics from "./admin/adminEpics";
import logErrorEpics from "./logError/logErrorEpics";

export default combineEpics(
    authEpics,
    contactFormEpics,
    adminEpics,
    logErrorEpics
);
