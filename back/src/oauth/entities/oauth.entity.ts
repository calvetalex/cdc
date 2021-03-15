import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Oauth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  fk_user_id: number;

  @Column()
  token: string;

  @Column()
  refresh_token: string;

  @Column()
  expires_at: Date;
}
