import { combineEpics } from 'redux-observable'
import contactFormEpics from './contactForm/contactFormEpics'
import authEpics from './auth/authEpics'
import adminEpics from './admin/adminEpics'
import interestEpics from './contactForm/interestsEpics'

export default combineEpics(
  authEpics,
  contactFormEpics,
  adminEpics,
  interestEpics
)
