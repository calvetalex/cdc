import Backend from '../../backend';
import {
    USER_SET,
    USER_REMOVE,
} from '../constants/ActionTypes';

export function setUser(data) {
    return async (dispatch) => {
        const user = await Backend.oauth.login(data);
        if (!user || !user.admin) {
            return {};
        }
        dispatch({ type: USER_SET, payload: user });
        return user;
    };
}

export function removeUser() {
    return async (dispatch) => {
        dispatch({ type: USER_REMOVE });
    };
}

export default {
    setUser,
    removeUser,
};
