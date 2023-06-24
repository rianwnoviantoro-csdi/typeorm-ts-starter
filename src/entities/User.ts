import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
