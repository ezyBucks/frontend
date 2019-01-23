import { NextFunction, Request, Response } from 'express';
import TransactionEntity from '../entities/transaction.entity';
import Router from '../router/base.router';
import Service from '../router/services';

/**
 * Transaction Routes
 */
class TransactionRoutes extends Router {
    /**
     * Routes to register
     */
    get services() {
        return [
            new Service('post', '/transaction', 'makeTransaction'),
            new Service('get', '/transaction', 'getTransactions')
        ];
    }

    /**
     * Makes the new transaction for the user
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     */
    public async makeTransaction(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const transaction = TransactionEntity.create(req.body);
        transaction.userFrom = req.user.id;
        console.log(transaction);
        res.send(await TransactionEntity.save(transaction));
    }

    /**
     * Gets all transactions from the current user
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     */
    public async getTransactions(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const transactions = await TransactionEntity.find({
            userFrom: req.user.id
        });
        let sum = 0;
        transactions.forEach(trans => {
            sum += trans.amount;
        });
        res.send({ transactions, sum });
    }
}

export default TransactionRoutes;
