import { BalanceAction, BALANCE, USER, UserAction } from './types';
import { User } from '../../types/User';

type UserActionType = BalanceAction | UserAction;

interface UserState {
    balance?: number;
    user?: User;
}

const defaultState: UserState = {
    balance: undefined,
    user: undefined
};

function balance(state: UserState = defaultState, action: UserActionType) {
    switch (action.type) {
        case BALANCE:
            return Object.assign({}, state, {
                balance: action.balance
            });
        case USER:
            return Object.assign({}, state, {
                user: action.user
            });
        default:
            return state;
    }
}

export default balance;
