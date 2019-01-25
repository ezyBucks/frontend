export interface Action{
    type: string;
}

export const AUTHENTICATE = 'AUTHENTICATE';

export function setAuthenticated(authenticated: boolean) {
    return { type: AUTHENTICATE, authenticated };
}
