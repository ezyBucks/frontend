import { combineReducers } from 'redux';
import { BalanceAction, BALANCE } from './types';

const defaultState = {
    balance: 0
};

function balance(state = defaultState, action: BalanceAction) {
    switch (action.type) {
        case BALANCE:
            return Object.assign({}, state, {
                balance: action.balance
            });
        default:
            return state;
    }
}

export default balance;
