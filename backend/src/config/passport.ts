import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import passport from "passport";
import passportLocal from "passport-local";
import { getConnection, Repository } from 'typeorm';
import { default as User } from "../db/entity/user.entity";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user: User, done: any) => {
  done(undefined, user.id);
});

passport.deserializeUser(async (id: string, done: any) => {

  const UserRepo = getConnection().getRepository(User);
  const currentUser = await UserRepo.findOne(id);

  done(null, currentUser);
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: "email" }, async (email: string, password: string, done: any) => {

  const userRepo = getConnection().getRepository(User);
  const currentUser = await userRepo.findOne({ email });

  console.log("Using the method from passport.ts");

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
