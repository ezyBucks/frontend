export interface AuthenticatedState {
    authenticated: boolean;
}

export const AUTHENTICATE = 'AUTHENTICATE';

export interface AuthenticateAction {
  type: typeof AUTHENTICATE;
  authenticated: boolean;
}
