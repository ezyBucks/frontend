import { NextFunction, Request, Response, Application } from "express";
import {Connection} from "typeorm";
import * as jwt from 'jsonwebtoken';
import { UserEntity } from "../db/entity/user.entity";


export function loginRoutes(app: Application, connection: Connection) {

    const userRepository = connection.getRepository(UserEntity);

    app.post(
        "/auth", 
        async function(req: Request, res: Response) {

            const email = req.body.email,
            password = req.body.password;

            if (!email || !password) {
                res.status(400).send();
                return;
            }

            const user = await userRepository.findOne(email)
            
            if (user) {
                console.log(user)
                try{
                    const token = jwt.sign({ user_id: user.id }, ".secrconfiget");
    
                    res.json(token);    
                } catch (e) {
                    console.log(e);

                    res.status(500).send()
                }               
            }else {
                res.status(401).send();
            }
        }
    );
}

/**
 * http(s) middleware guard
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {Response}
 */
export const guard = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization'];
        if (token) {
            jwt.verify(token, process.env.APPLICATION_SECRET, (err, user) => {
                if (err) {
                    console.error(err);
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    req.body.user = user._doc;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
};







// const jwt   = require('jsonwebtoken');

// // use 'utf8' to get string instead of byte array  (512 bit key)
// //var privateKEY  = fs.readFileSync('./private.key', 'utf8');
// //var publicKEY  = fs.readFileSync('./public.key', 'utf8');  

// module.exports = {
//  sign: (payload, $Options) => {
//   /*
//    sOptions = {
//     issuer: "Authorizaxtion/Resource/This server",
//     subject: "iam@user.me", 
//     audience: "Client_Identity" // this should be provided by client
//    }
//   */
//   // Token signing options
//   var signOptions = {
//       issuer:  $Options.issuer,
//       subject:  $Options.subject,
//       audience:  $Options.audience,
//       expiresIn:  "30d",    // 30 days validity
//       algorithm:  "RS256"    
//   };
//   return jwt.sign(payload, privateKEY, signOptions);
// },
// verify: (token, $Option) => {
//   /*
//    vOption = {
//     issuer: "Authorization/Resource/This server",
//     subject: "iam@user.me", 
//     audience: "Client_Identity" // this should be provided by client
//    }  
//   */
//   var verifyOptions = {
//       issuer:  $Option.issuer,
//       subject:  $Option.subject,
//       audience:  $Option.audience,
//       expiresIn:  "30d",
//       algorithm:  ["RS256"]
//   };
//    try{
//      return jwt.verify(token, publicKEY, verifyOptions);
//    }catch (err){
//      return false;
//    }
// },
//  decode: (token) => {
//     return jwt.decode(token, {complete: true});
//     //returns null if token is invalid
//  }
// }