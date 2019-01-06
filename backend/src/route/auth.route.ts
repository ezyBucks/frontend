import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import UserEntity from "../db/entity/user.entity";

export let login = (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate(
        "local",
        (err: Error, user: UserEntity, info: IVerifyOptions) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            console.log(user);
            console.log("Failed to find user.");
            return res.redirect("/login");
        }

        req.logIn(user, (err: Error) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
            console.log("Signed in??");
        });
        }
  )(req, res, next);
};
