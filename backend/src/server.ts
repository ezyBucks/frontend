import bodyParser from "body-parser"; // used to parse the form data that you pass in the request
import cors from "cors";
import express, { Request, Response } from "express";
import passport from "passport";
import { createConnection } from "typeorm";
import * as passportConfig from "./config/passport";
import { userRoutes } from "./route/user.route";
import * as auth from "./route/auth.route";

const PORT = process.env.PORT || 8080;

createConnection().then((connection) => {

    const app = express();

    // support application/json type post data
    app.use(bodyParser.json());

    // support application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // Setup Auth JWT
    app.use(passport.initialize());

    // support cors for all origins should change later.
    const router = express.Router();

    // options for cors midddleware
    const options: cors.CorsOptions = {
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
      credentials: true,
      methods: "HEAD,OPTIONS,GET,POST,PATCH,DELETE",
      origin: '*',
      preflightContinue: false
    };
    // use cors middleware
    router.use(cors(options));
    // enable pre-flight

    router.options("*", cors(options));

    // Users
    userRoutes(app, connection);

    app.get(
        "/",
        passportConfig.isAuthenticated,
        (req: Request, res: Response) => {
        res.send("Should not be able to see");
    });

    app.get("/login", (req: Request, res: Response) => {
        res.send("Temp login placeholder. Should be redirected here");
    });

    app.post("/login", auth.login);

    app.listen(PORT, () => {
        console.log("Listening on port " + PORT);
    });
});
