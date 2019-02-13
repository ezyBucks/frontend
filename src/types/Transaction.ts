import {User} from './User';

/**
 * Represents a transaction between two users.
 */
export interface Transaction {
    id: number;
    timestamp: number;
    from: User;
    to: User;
    amount: number;
}