export interface UserState {
    balance: number;
}

export const BALANCE = 'BALANCE';

export interface BalanceAction {
    type: typeof BALANCE;
    balance: number;
}
