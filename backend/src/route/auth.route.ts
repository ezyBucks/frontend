import * as passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import moment from "moment";
import UserEntity from "../db/entity/user.entity";
import jwt from "jwt-simple";
import { Request, Response } from "express";

class Auth {

    public initialize = () => {
        passport.use("jwt", this.getStrategy());
        return passport.initialize();
    }

    public authenticate = (callback: any) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

    private genToken = (user: UserEntity): Object => {
        let expires = moment().utc().add({ days: 7 }).unix();
        let token = jwt.encode({
            exp: expires,
            username: user.username
        }, process.env.JWT_SECRET);

        return {
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            user: user.id
        };
    }

    public login = async (req: Request, res: Response) => {
        try {
            req.checkBody("username", "Invalid username").notEmpty();
            req.checkBody("password", "Invalid password").notEmpty();

            let errors = req.validationErrors();

            if (errors) {
                throw errors;
            }

            let user = await User.findOne({ "username": req.body.username }).exec();

            if (user === null) {
                throw "User not found";
            }

            let success = await user.comparePassword(req.body.password);

            if (success === false) {
                throw "";
            }

            res.status(200).json(this.genToken(user));
        } catch (err) {
            res.status(401).json({ "message": "Invalid credentials", "errors": err });
        }
    }

    private getStrategy = (): Strategy => {
        const params = {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            passReqToCallback: true
        };

        return new Strategy(params, (req: Request, payload: any, done: any) => {

            User.findOne({ "username": payload.username }, (err, user) => {
                /* istanbul ignore next: passport response */
                if (err) {
                    return done(err);
                }
                /* istanbul ignore next: passport response */
                if (user === null) {
                    return done(null, false, { message: "The user in the token was not found" });
                }

                return done(null, { _id: user._id, username: user.username });
            });
        });
    }

}

export default new Auth();