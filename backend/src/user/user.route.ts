import { Application, Request, Response } from 'express';
import passport from 'passport';
import { Connection } from 'typeorm';
import UserEntity from '../entities/user.entity';

export function userRoutes(app: Application, connection: Connection): void {
    app.get(
        '/user',
        passport.authenticate('jwt', {
            session: false
        }),
        async (req: Request, res: Response) => {
            const items = await UserEntity.find();
            const count = await UserEntity.count();

            res.json({
                count,
                items
            });
        }
    );

    app.get(
        '/user/:id',
        passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            const user = await UserEntity.findOne(req.params.id);

            if (!user) {
                res.send({
                    message: `No user with the ID of ${req.params.id}`
                });
            }

            res.send(user);
        }
    );

    app.post(
        '/user',
        passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            const user = UserEntity.create(req.body);
            res.send(await UserEntity.save(user));
        }
    );

    app.delete(
        '/user/:id',
        passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            const user = await UserEntity.findOne(req.params.id);
            if (user) {
                res.send(await UserEntity.remove(user));
            } else {
                res.status(404).send(
                    'Failed to find user with ID ' + req.params.id
                );
            }
        }
    );
}
