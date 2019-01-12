import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import UserEntity from '../entities/user.entity';
import Router from './base.router';

class UserRoutes extends Router {
    get services() {
        return {
            'GET /user': 'getAllUsers',
            'GET /user:id': 'getUserById',
            'POST /user': 'addNewUser',
            'DELETE /user': 'deleteUser'
        };
    }

    get middleware() {
        return [
            passport.authenticate('jwt', {
                session: false
            })
        ];
    }

    /**
     * Gets all users from the DB
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     */
    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        const items = await UserEntity.find();
        const count = await UserEntity.count();

        res.json({
            count,
            items
        });
    }

    /**
     * Gets the User with the provided ID
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     */
    public async getUserById(req: Request, res: Response, next: NextFunction) {
        const user = await UserEntity.findOne(req.params.id);

        if (!user) {
            res.send({
                message: `No user with the ID of ${req.params.id}`
            });
        }

        res.send(user);
    }

    /**
     * Adds the User
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     */
    public async addNewUser(req: Request, res: Response, next: NextFunction) {
        // TODO Add validation
        const user = UserEntity.create(req.body);
        res.send(await UserEntity.save(user));
    }

    /**
     * Deletes the User
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     */
    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        const user = await UserEntity.findOne(req.params.id);
        if (user) {
            res.send(await UserEntity.remove(user));
        } else {
            res.status(404).send(
                'Failed to find user with ID ' + req.params.id
            );
        }
    }
}

export default UserRoutes;
