import { BALANCE, BalanceAction, UserAction, USER } from './types';
import { User } from '../../types/User';

export function setBalance(value: number): BalanceAction {
    return { type: BALANCE, balance: value };
}

export function setUser(value: User): UserAction {
    return { type: USER, user: value };
}
