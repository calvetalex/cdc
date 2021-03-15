import {
  Controller,
  Get,
  Res,
  Body,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { OauthService } from './oauth.service';

@Controller('/oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get()
  async alive(): Promise<any> {
    return Promise.resolve('alive');
  }

  @Post('login')
  async getAll(@Res() res, @Body() body) {
    if (body.email && body.password) {
      try {
        const user = await this.oauthService.login(body.email, body.password);
        if (user) {
          return res.status(HttpStatus.OK).json(user);
        }
        return res.status(HttpStatus.NOT_FOUND).json({});
      } catch (err) {
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({});
      }
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({});
    }
  }

  @Get(':refresh')
  async getUserFromEmail(@Res() res, @Param('refresh') refresh_token: string) {
    try {
      const newToken = this.oauthService.refreshToken(refresh_token);
      if (newToken) {
        return res.status(HttpStatus.OK).json(newToken);
      }
      return res.status(HttpStatus.NOT_FOUND).json({});
    } catch (err) {
      console.error(err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({});
    }
  }
}
