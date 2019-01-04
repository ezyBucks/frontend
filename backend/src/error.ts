// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";

// function errorHandler(err, req, res, next) {
//     if (typeof (err) === 'string') {
//         // custom application error
//         return res.status(400).json({ message: err });
//     }

//     if (err.name === 'UnauthorizedError') {
//         // jwt authentication error
//         return res.status(401).json({ message: 'Invalid Token' });
//     }

//     // default to 500 server error
//     return res.status(500).json({ message: err.message });
// }

// function loggedIn(req: Request, res: Response, next: NextFunction) {

//     let secret = "blach";

//     jwt.verify(req.cookies.authorization, secret, (err: any, decoded: any) => {
//         if(err) {
//             console.log('invalid user, redirecting to login page');
//             res.redirect('/login');
//         } else {
//             decoded.loggedIn = true;
//             req.decoded = decoded;
//             req.admin = decoded.permissions === 1 ? true : false
//             next();
//         }
//     });
// }
