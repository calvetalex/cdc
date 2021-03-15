import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Modules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  fk_parent_id: number;

  @Column('int')
  split: number;
}
