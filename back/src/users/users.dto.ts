import { IsString, IsNotEmpty, MaxLength, IsBoolean } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @IsString()
  @IsNotEmpty()
  mail: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  admin: boolean;
}
