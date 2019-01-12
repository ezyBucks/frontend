import bodyParser from 'body-parser'; // used to parse the form data that you pass in the request
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { Connection, createConnection } from 'typeorm';

import expressValidator from 'express-validator';
import { authRoutes } from './auth/auth.route';
import errorMiddleware from './error/error.middleware';
// import { userRoutes } from './user/user.route';

import UserRoutes from './router/user.router';

const PORT = process.env.PORT || 8080;

createConnection()
    .then((connection: Connection) => {
        // Hacks as well need to wait for the DB connection to be established.
        require('./auth/passport.middleware');

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
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token'
            ],
            credentials: true,
            methods: 'HEAD,OPTIONS,GET,POST,PATCH,DELETE',
            origin: '*',
            preflightContinue: false
        };

        // add cors support probs need to limit this to our domains
        router.use(cors(options));
        router.options('*', cors(options));

        // Users routes.
        // userRoutes(app, connection);

        const user = new UserRoutes('', app);
        authRoutes(app, connection);

        app.use(errorMiddleware);

        app.listen(PORT, () => {
            console.log('Listening on port ' + PORT);
        });
    })
    .catch((reason: any) => {
        console.log({
            reason,
            message: 'TypeORM Failed to get connection to DB'
        });
    });
