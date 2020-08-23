import { combineReducers } from "redux";
import usersReducer from "../../modules/users/redux/reducers/usersReducer";
import interestsReducer from "../../modules/interests/redux/reducers/interestsReducer";

export default combineReducers({
    users: usersReducer,
    interests: interestsReducer,
});
