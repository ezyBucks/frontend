import { AUTHENTICATE } from './types';

export function setAuthenticated(authenticated: boolean) {
    return { type: AUTHENTICATE, authenticated };
}
