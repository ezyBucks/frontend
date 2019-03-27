import { BALANCE, BalanceAction } from './types';

export function setBalance(value: number): BalanceAction {
    return { type: BALANCE, balance: value };
}
