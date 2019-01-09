import bcrypt from "bcryptjs";
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

// http://typeorm.io/#/active-record-data-mapper using active record style.
@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ nullable: true })
  public firstname: string = "";

  @Column({ nullable: true })
  public lastname: string = "";

  @Column({ nullable: true })
  public email: string = "";

  @Column({ nullable: true })
  public username: string = "";

  @Column({ nullable: true })
  public password: string = "";

  public async comparePassword(potential: string) {
    return await bcrypt.compare(potential, this.password);
  }

  @BeforeInsert()
  protected async hashPassword() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }

  // @AfterLoad()
  // Can unhash pass here if we want to be loose
}

export default UserEntity;
