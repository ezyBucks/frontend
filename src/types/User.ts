/**
 * Represents a user signed up to ezyBucks.
 */
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    verified: boolean;
}