import { combineReducers } from 'redux';
import { AUTHENTICATE } from '../Actions/Authenticate';

function authenticated(state = false, action: any) {
    switch (action.type) {
        case AUTHENTICATE:
            return action.authenticated;
        default:
            return state;
    }
}

export default combineReducers({ authenticated });
