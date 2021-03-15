import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('bool')
  admin: boolean;
}