import UserRoutes from '../user/user.router';
import AuthRoutes from '../auth/auth.router';
import TransactionRoutes from '../transaction/transaction.router';
import { Application } from 'express';

/**
 * Register all of the functions defined in the getRoutes function
 *
 * @param {Application} The express appplication
 */
export default function registerRoutes(app: Application) {
    const routesToRegister = getRoutes();

    routesToRegister.forEach((route: any) => {
        const newRoute = new route('', app);
    });
}

/**
 * Gets the routes to register
 *
 * @return {any[]}
 */
function getRoutes(): any[] {
    return [UserRoutes, AuthRoutes, TransactionRoutes];
}
