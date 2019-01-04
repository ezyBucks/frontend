import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}

export default UserEntity;
