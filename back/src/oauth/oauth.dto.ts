import { IsNumber, IsDate, IsString, IsNotEmpty } from 'class-validator';

export class OauthDto {
  @IsNumber()
  readonly fk_user_id: number;

  @IsNumber()
  readonly type: number;

  @IsString()
  @IsNotEmpty()
  readonly token: string;

  @IsString()
  @IsNotEmpty()
  readonly refresh_token: string;

  @IsDate()
  readonly expires_at: Date;
}
