import {
    Application,
    Request,
    Response
} from "express";

import {
    Connection
} from "typeorm";

import jwt from "jsonwebtoken";
import passport from "passport";
import secret from "../auth/config";
import UserEntity from "../entity/user.entity";
import cors = require("cors");

export function authRoutes(app: Application, connection: Connection): void {

    app.post(
        "/signup",
        cors(),
        passport.authenticate("signup", {
            session: false
        }),
        async (req: Request, res: Response) => {
            res.json({
                message: "Should be signed up now!",
                user: req.user
            });
        }
    );

    app.post('/login', async (req, res, next) => {
        passport.authenticate('login', async (err: IResponseError, user: UserEntity, info) => {
            try {
                if (err || !user) {       
                    return next({err, user, info});
                }

                req.login(user, {
                    session: false
                }, async (error) => {
                    if (error) {
                        return next(error);
                    }

                    const body = {
                        id: user.id,
                        email: user.email
                    };

                    // sign JWT! need to move this into dotenv!
                    const token = jwt.sign({
                        user: body
                    }, secret);

                    return res.json({
                        token
                    });
                });
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    });
}
