import { combineEpics } from 'redux-observable'
import contactFormEpics from '../../modules/contactForm/redux/epics/contactFormEpics'
import authEpics from './auth/authEpics'
import adminEpics from '../../modules/admin/redux/epics/adminEpics'
import interestEpics from '../../modules/admin/redux/epics/interestsEpics'

export default combineEpics(
    authEpics,
    contactFormEpics,
    adminEpics,
    interestEpics
)
