/**
 * Represents a transaction between two users.
 */
export interface Transaction {
    id: number;
    timestamp: number;
    from: number;
    to: number;
    amount: number;
}