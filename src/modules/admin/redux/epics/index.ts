import { combineEpics } from 'redux-observable'
import usersEpics from '../../modules/users/redux/epics/usersEpics'
import interestEpics from '../../modules/interests/redux/epics/interestsEpics'

export default combineEpics(usersEpics, interestEpics)
