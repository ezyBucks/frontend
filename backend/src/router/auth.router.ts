import { NextFunction, Request, Response, Application } from 'express';
import passport from 'passport';
import Router from './base.router';
import secret from '../config';
import Service from './services';
import UserEntity from '../entities/user.entity';

import jwt from 'jsonwebtoken';

/**
 * AuthRoutes
 *
 * Defines the authentication routes.
 *
 * @extends Router
 */
class AuthRoutes extends Router {
    /**
     * The HTTP methods supported by the routes and the functions
     * they will call.
     */
    get services() {
        return [
            new Service('post', '/signup', 'signUp', [
                passport.authenticate('signup', {
                    session: false
                })
            ]),
            new Service('post', '/signin', 'signIn').withNoMiddleware()
        ];
    }

    /**
     * Signs the user up with provided email and password.
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     */
    public async signUp(req: Request, res: Response, next: NextFunction) {
        res.json({
            message: 'Should be signed up now!',
            user: req.user
        });
    }

    /**
     * Signs the user up with provided email and password.
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     */
    public async signIn(req: Request, res: Response, next: NextFunction) {
        passport.authenticate(
            'signin',
            async (err: Error, user: UserEntity, info) => {
                try {
                    if (err || !user) {
                        return next({ err, user, info });
                    }
                    req.login(
                        user,
                        {
                            session: false
                        },
                        error => {
                            this.loginHandler(error, user, res, next);
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }

    /**
     * Seperate function the handle the response after running
     * the signin authentication.
     *
     * @param error any
     * @param user UserEntity
     * @param res Response
     * @param next NextFunction
     */
    private loginHandler(
        error: any,
        user: UserEntity,
        res: Response,
        next: NextFunction
    ) {
        if (error) {
            return next(error);
        }

        const body = {
            id: user.id,
            email: user.email
        };

        // sign JWT! need to move this into dotenv!
        const token = jwt.sign(
            {
                user: body
            },
            secret,
            {
                expiresIn: '1h'
            }
        );

        console.log(res.cookie);

        // Add jwt token as a cookie should be http only
        res.cookie('jwt', token, {
            httpOnly: true
        });

        res.json({ success: true, token });
    }
}

export default AuthRoutes;
