import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Services {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    fk_module_id: number;

    @Column('int')
    place: number;

    @Column('int')
    service_type: number;

    @Column('json')
    data: any;
}