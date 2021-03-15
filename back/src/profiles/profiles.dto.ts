import { IsString } from 'class-validator';

export class ProfilesDto {
  @IsString()
  readonly name: string;
}