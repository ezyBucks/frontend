import {
  NextFunction,
  Request,
  Response
} from "express";
import _ from "lodash";
import passport from "passport";
import passportLocal from "passport-local";
import {
  getConnection,
  Repository
} from 'typeorm';
import secret from "../auth/config";
import {
  default as User
} from "../entity/user.entity";

const localStrategy = passportLocal.Strategy;

// Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email: string, password: string, done: any) => {
  try {
    const user = new User();
    user.email = email;
    user.password = password;

    await user.save();

    // Send the user information to the next middleware
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));

// Create a passport middleware to handle User login
passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email: string, password: string, done: any) => {
  try {
    // Find the user associated with the email provided by the user
    const user = await User.findOne({
      email
    });
    if (!user) {
      // If the user isn't found in the database, return a message
      return done(null, false, {
        message: 'Incorrect Email or Password'
      });
    }
    // Validate password and make sure it matches with the corresponding hash stored in the database
    // If the passwords match, it returns a value of true.
    const validate = await user.comparePassword(password);
    if (!validate) {
      return done(null, false, {
        message: 'Wrong Password'
      });
    }
    // Send the user information to the next middleware
    return done(null, user, {
      message: 'Logged in Successfully'
    });
  } catch (error) {
    return done(error);
  }
}));

const JWTstrategy = require('passport-jwt').Strategy;
// We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;

// This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
  // move to dotenv!
  secretOrKey: secret,
  // pull token from header
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token: any, done: any) => {
  try {
    // Pass the user details to the next middleware
    return done(null, token.user);
  } catch (error) {
    done({error});
  }
}));

export default passport;
