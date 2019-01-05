import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, AfterLoad} from "typeorm";
import bcrypt from "bcrypt-nodejs"
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

    @BeforeInsert()
    hashPassword() {
        this.password = "";
    }

    @AfterLoad()
    unhashPassword() {
        this.password = "'bcrypt'"
    }

    comparePassword (candidatePassword: string, cb: (err: any, isMatch: boolean) => void) {
        bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
          cb(err, isMatch);
        });
    };
}

export default UserEntity;
