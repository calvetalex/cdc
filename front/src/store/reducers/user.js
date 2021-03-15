import {
    USER_SET,
    USER_REMOVE,
} from '../constants/ActionTypes';

const initialState = {};

export default function user(state = initialState, action) {
    switch (action.type) {
        case USER_SET:
            return action.payload;

        case USER_REMOVE:
            return {};

        default:
            return state;
    }
}
