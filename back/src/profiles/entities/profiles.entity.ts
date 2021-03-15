import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
