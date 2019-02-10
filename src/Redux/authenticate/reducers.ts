import { combineReducers } from 'redux';
import { AUTHENTICATE, AuthenticateAction } from './types';

function authenticated(state = false, action: AuthenticateAction) {
    switch (action.type) {
        case AUTHENTICATE:
            return action.authenticated;
        default:
            return state;
    }
}

export default combineReducers({ authenticated });
