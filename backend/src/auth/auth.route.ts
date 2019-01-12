import { Application, NextFunction, Request, Response } from 'express';

import { Connection } from 'typeorm';
const { check, validationResult } = require('express-validator/check');
import jwt from 'jsonwebtoken';
import passport from 'passport';
import secret from '../config';
import UserEntity from '../entities/user.entity';

export function authRoutes(app: Application, connection: Connection): void {
    app.post(
        '/signup',
        passport.authenticate('signup', {
            session: false
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            // Respond with the new user details
            res.json({
                message: 'Should be signed up now!',
                user: req.user
            });
        }
    );

    function checkEmailAndPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        req.check('email', 'Email is not valid.').isEmail();

        // password must be at least 5 chars long
        req.check('password').isLength({ min: 5 });

        console.log(req);

        next();
    }

    app.post('/signin', async (req, res, next) => {
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
                        async (error) => {
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
                                    expiresIn: '30s'
                                }
                            );

                            // Add jwt token as a cookie should be http only
                            res.cookie('jwt', token);

                            return res.json({
                                success: true,
                                token
                            });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    });
}
