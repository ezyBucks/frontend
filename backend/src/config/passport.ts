import { Application } from "express";
import passport from "passport";
import {
  ExtractJwt,
  Strategy as JWTStrategy,
  StrategyOptions
} from "passport-jwt";

import User from "../db/entity/user.entity";

// https://github.com/osenvosem/project-typescript-express-mongoose-jwt-react/blob/master/src/server/libConfig/passport.ts

export default (app: Application) => {
  app.use(passport.initialize());

  const options: StrategyOptions = {
    jwtFromRequest(req) {
      let token = null;
      if (req && req.signedCookies) {
        token = req.signedCookies["access_token"];
      }
      return token;
    },
    secretOrKey: "demo"
  };

  passport.use(
    new JWTStrategy(options, (payload, done) => {
      User.findById(payload.id, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        return done(null, pick(user, User.publicFields));
      });
    })
  );
};
