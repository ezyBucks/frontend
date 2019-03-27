import { combineReducers } from 'redux';
import { AUTHENTICATE, AuthenticateAction } from './types';

const defaultState = {
    authenticated: false
};

function authenticated(state = defaultState, action: AuthenticateAction) {
    switch (action.type) {
        case AUTHENTICATE:
            return Object.assign({}, state, {
                authenticated: action.authenticated
            });
        default:
            return state;
    }
}

export default authenticated;
