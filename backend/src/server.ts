import bodyParser from "body-parser"; // used to parse the form data that you pass in the request
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Connection, createConnection } from "typeorm";
import { authRoutes } from "./route/auth.route";
import { userRoutes } from "./route/user.route";

import expressValidator from "express-validator";

const PORT = process.env.PORT || 8080;

createConnection()
  .then((connection: Connection) => {
    // Hacks as well need to wait for the DB connection to be established.
    require("./auth/passport");

    const app = express();

    // support application/json type post data
    app.use(bodyParser.json());

    // support for express-validator
    app.use(expressValidator());

    // support application/x-www-form-urlencoded post data -- We can probs remove this if we only want JSON
    app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );

    // Setup Auth JWT
    app.use(passport.initialize());

    // support cors for all origins should change later.
    const router = express.Router();

    // options for cors midddleware
    const options: cors.CorsOptions = {
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token"
      ],
      credentials: true,
      methods: "HEAD,OPTIONS,GET,POST,PATCH,DELETE",
      origin: "*",
      preflightContinue: false
    };

    // add cors support probs need to limit this to our domains
    router.use(cors(options));
    router.options("*", cors(options));

    // Users routes.
    userRoutes(app, connection);
    authRoutes(app, connection);

    app.get("/", (req: Request, res: Response) => {
      res.send("Should not be able to see");
    });

    app.use(
      (
        err: IResponseError,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        res.status(err.status || 500);
        res.json({
          error: err,
          custom : "Lol you broke it"
        });
      }
    );

    app.listen(PORT, () => {
      console.log("Listening on port " + PORT);
    });
  })
  .catch((reason: any) => {
    console.log({
      reason,
      message: "TypeORM Failed to get connection to DB probs"
    });
  });
