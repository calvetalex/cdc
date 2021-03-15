import { IsNumber, IsJSON } from 'class-validator';

export class ServicesDto {
  @IsNumber()
  readonly fk_module_id: number;

  @IsNumber()
  readonly place: number;

  @IsNumber()
  readonly service_type: number;

  @IsJSON()
  readonly data: any;
}
