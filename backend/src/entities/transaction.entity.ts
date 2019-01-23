import bcrypt from 'bcryptjs';
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    ManyToOne
} from 'typeorm';

import UserEntity from './user.entity';

@Entity()
export class TransactionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public amount: number;

    @ManyToOne(type => UserEntity, user => user.id)
    public userFrom: UserEntity;

    @ManyToOne(type => UserEntity, user => user.id)
    public userTo: UserEntity;
}

export default TransactionEntity;
