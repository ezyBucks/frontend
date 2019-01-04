import { Application, Request, Response } from "express";
import { Connection } from "typeorm";
import { UserEntity } from "../db/entity/user.entity";

export function userRoutes(app: Application, connection: Connection): void {

    const userRepository = connection.getRepository(UserEntity);

    app.get(
        "/user",
        async (req: Request, res: Response) => {
            const items = await userRepository.find();
            const count = await userRepository.count();

            res.json({
                count,
                items
            });
    });

    app.get(
        "/user/:id",
        async (req: Request, res: Response) => {
            res.send(await userRepository.findOne(req.params.id));
    });

    app.post(
        "/user",
        async (req: Request, res: Response) => {
            const user = userRepository.create(req.body);
            res.send(await userRepository.save(user));
    });

    app.delete(
        "/user/:id",
        async (req: Request, res: Response) => {
            const user =  await userRepository.findOne(req.params.id);
            if (user) {
                res.send(await userRepository.remove(user));
            } else {
                res.status(404).send("Failed to find user with ID " + req.params.id);
            }
    });
}
