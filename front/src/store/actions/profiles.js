import { PROFILES_SET, PROFILES_ADD, PROFILES_DEL } from '../constants/ActionTypes';
import Backend from '../../backend';

export function setProfiles() {
    return async (dispatch) => {
        const profiles = Backend.profiles.getAll();
        if (!profiles) {
            return [];
        }
        dispatch({ type: PROFILES_SET, payload: profiles });
        return profiles;
    };
}

export function addProfile(data) {
    return async (dispatch) => {
        const profile = Backend.profiles.createProfile(data);
        dispatch({ type: PROFILES_ADD, payload: profile });
        return profile;
    };
}

export function deleteProfile(data) {
    return async (dispatch) => {
        const entity = await Backend.profiles.remove(data);
        if (!entity) {
            return {};
        }
        dispatch({ type: PROFILES_DEL, payload: entity });
        return entity;
    };
}

export default {
    setProfiles,
    addProfile,
    deleteProfile,
};
