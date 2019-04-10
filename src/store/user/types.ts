import { User } from '../../types/User';

export interface UserState {
    balance: number;
    user: User;
}

export const BALANCE = 'BALANCE';
export const USER = 'USER';

export interface BalanceAction {
    type: typeof BALANCE;
    balance: number;
}

export interface UserAction {
    type: typeof USER;
    user: User;
}
