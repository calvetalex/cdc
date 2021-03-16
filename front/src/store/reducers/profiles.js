import { PROFILES_ADD, PROFILES_SET, PROFILES_DEL } from '../constants/ActionTypes';

const initialState = [];

export default function profiles(state = initialState, action) {
    switch (action.type) {
        case PROFILES_SET:
            return action.payload;
        case PROFILES_ADD:
            return [...state, action.payload];
        case PROFILES_DEL:
            return state.filter(elem => elem.id === action.payload.id);
        default:
            return state;
    }
}
