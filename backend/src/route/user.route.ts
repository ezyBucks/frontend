import {Request, Response, Application} from "express";
import {Connection} from "typeorm";
import { UserEntity } from "../db/entity/user.entity";

export function userRoutes(app: Application, connection: Connection): void {
       
    const userRepository = connection.getRepository(UserEntity);

    app.get(
        "/user",
        async function(req: Request, res: Response) {

            let items = await userRepository.find();
            let count = await userRepository.count();
            res.json({
                items,
                count
            });
    });            

    app.get(
        "/user/:id",
        async function(req: Request, res: Response) {
            res.send(await userRepository.findOne(req.params.id));
    });

    app.post(
        "/user", 
        async function(req: Request, res: Response) {
            const user = userRepository.create(req.body);
            res.send(await userRepository.save(user));
    });

    app.delete(
        "/user/:id",
        async function(req: Request, res: Response) {
            let user =  await userRepository.findOne(req.params.id);

            if (user) {
                res.send(await userRepository.remove(user));
            } else {
                res.status(404).send("Failed to find user with ID " + req.params.id);
            }
    });  
}
