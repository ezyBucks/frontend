import bcrypt from "bcrypt-nodejs";
import {  AfterLoad, BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({nullable: true})
    public firstname: string = "";

    @Column({nullable: true})
    public lastname: string = "";

    @Column({nullable: true})
    public email: string = "";

    @Column({nullable: true})
    public username: string = "";

    @Column({nullable: true})
    public password: string = "";

    public comparePassword(candidatePassword: string, cb: (err: any, isMatch: boolean) => void) {
        bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
          cb(err, isMatch);
        });
    }

    @BeforeInsert()
    protected hashPassword() {
        this.password = "";
    }

    @AfterLoad()
    protected unhashPassword() {
        this.password = "'bcrypt'";
    }
}

export default UserEntity;
