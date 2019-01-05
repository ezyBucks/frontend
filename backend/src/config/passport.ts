import passport from "passport";
import passportLocal from "passport-local";
import _ from "lodash";

import { default as User } from "../db/entity/user.entity";
import { Request, Response, NextFunction } from "express";

import { getConnection, Repository } from 'typeorm';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser(async (id: string, done) => {

  const UserRepo = getConnection().getRepository(User);
  const currentUser = await UserRepo.findOne(id);

  done(null, currentUser);
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: "email" }, async (email: string, password: string, done) => {

  const userRepo = getConnection().getRepository(User);
  const currentUser = await userRepo.findOne({ email });

  if (!currentUser) {      
      return done(undefined, false, { message: `Email ${email} not found.` });
  }

  currentUser.comparePassword(password, (err: Error, isMatch: boolean) => {
      if (err) { 
        return done(err); 
      }

      if (isMatch) {
        return done(undefined, currentUser);
      }

      return done(undefined, false, { message: "Invalid email or password." });
    });
  })
);

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

/**
 * Authorization Required middleware.
 */
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const provider = req.path.split("/").slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
