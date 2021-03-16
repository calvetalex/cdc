import { combineReducers } from 'redux';
import user from './user';
import profiles from './profiles';

const rootReducer = combineReducers({
    user,
    profiles,
});

export default rootReducer;
