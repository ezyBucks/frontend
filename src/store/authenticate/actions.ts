import { AUTHENTICATE, AuthenticateAction } from './types';

export function setAuthenticated(authenticated: boolean): AuthenticateAction {
    return { type: AUTHENTICATE, authenticated };
}
