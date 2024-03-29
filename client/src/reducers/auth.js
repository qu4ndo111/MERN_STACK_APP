import { AUTH, LOGOUT, USER, UPDATE_PROFILE } from '../constants/actionTypes';

const authReducer = (state = { profile: null ,authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data };
        case USER:
            return { ...state, profile: action?.data };
        case UPDATE_PROFILE:
            return { ...state, profile: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;