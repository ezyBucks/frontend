import { NextFunction, Request, Response, Application } from 'express';
import passport from 'passport';
import Router from './base.router';
import secret from '../config';
import Service from './services';
import UserEntity from '../entities/user.entity';
import { verificationEmail } from '../mailer/verification.mailer';
import HttpException from '../error/HttpException';
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
            new Service('post', '/signin', 'signIn').withNoMiddleware(),
            new Service('get', '/verify', 'verfiyEmail').withNoMiddleware()
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
        verificationEmail(req.user).sendMail();

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

        // correct email and password but not verified email.
        if (!user.isValidated) {
            return next(new HttpException(400, 'Email is not verfied'));
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

    /**
     * Verifys the users email.
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     */
    private async verfiyEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const result = (await jwt.verify(
                req.query.token,
                secret
            )) as UserEntity;

            const user = await UserEntity.findOne(result.id);
            user.isValidated = true;
            user.save();
        } catch {
            return next(new HttpException(400, 'Token expired.'));
        }

        return res.json({ message: 'Email verified' });
    }
}

export default AuthRoutes;
