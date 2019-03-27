import { combineReducers } from 'redux';
import { BalanceAction, BALANCE } from './types';

interface BalanceState {
    balance?: number;
}

const defaultState: BalanceState = {
    balance: undefined
};

function balance(state: BalanceState = defaultState, action: BalanceAction) {
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
