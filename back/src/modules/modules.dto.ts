import { IsNumber } from 'class-validator';

export class ModulesDto {
    @IsNumber()
    fk_parent_id: number;

    @IsNumber()
    split: number;
}