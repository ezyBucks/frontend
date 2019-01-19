import bcrypt from 'bcryptjs';
import {
    AfterLoad,
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    OneToMany
} from 'typeorm';
import { IsEmail, IsString, MinLength } from 'class-validator';
import Transaction from "./transaction.entity";

// http://typeorm.io/#/active-record-data-mapper using active record style.
@Entity()
@Unique(['email', 'username'])
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id?: number;

    @IsString()
    @Column({ nullable: true })
    public firstname: string = '';

    @IsString()
    @Column({ nullable: true })
    public lastname: string = '';

    @IsEmail()
    @Column({ nullable: true })
    public email: string = '';

    @IsString()
    @Column({ nullable: true })
    public username: string = '';

    @MinLength(5, {
        message: 'Password must be more than 5 characters.'
    })
    @Column({ nullable: true })
    public password: string = '';

    public async comparePassword(potential: string) {
        return await bcrypt.compare(potential, this.password);
    }

    @BeforeInsert()
    protected async hashPassword() {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }

    @OneToMany(type => Transaction, transaction => transaction.userFrom)
    transactions: Transaction[];

    // @AfterLoad()
    // Can unhash pass here if we want to be loose
}

export default UserEntity;
