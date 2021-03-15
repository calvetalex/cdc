import {
  Injectable,
  Inject,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { generator } from 'rand-token';

import { Users } from 'src/users/entities/users.entity';
import { UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Oauth } from './entity/oauth.entity';
import { OauthDto } from './oauth.dto';

@Injectable()
export class OauthService {
  constructor(
    @Inject('OAUTH_REPOSITORY')
    private readonly oauthRepository: Repository<Oauth>,
    private readonly userService: UserService,
  ) {}

  static extractData(obj: any): any {
    return Object.keys(obj)
      .map((key) => {
        return key === '_doc' ? obj[key] : null; // TODO: console log key to see what is inside obj to debug and fix this
      })
      .filter((e) => e)[0];
  }

  static generateToken(): string {
    return generator().generate(64);
  }

  async saveData(action: OauthDto): Promise<Oauth> {
    return this.oauthRepository.save(action);
  }

  async delete(action: OauthDto) {
    return this.oauthRepository.delete(action);
  }

  async findTokenForUser(id: number): Promise<Oauth> {
    return this.oauthRepository.findOne({ where: { fk_user_id: id } });
  }

  async login(email: string, password: string): Promise<any> {
    const user: Users = await this.userService.isUser(email, password);
    if (user) {
      // user = OauthService.extractData(user);
      const { password, ...res } = user;
      const isValidToken = await this.findTokenForUser(user.id);
      if (isValidToken && isValidToken.expires_at > new Date()) {
        return Object.assign({}, res, { token: isValidToken });
      }
      const newToken: OauthDto = {
        fk_user_id: user.id,
        type: 0, //TODO: fix this, don't know which value to give to this column
        token: OauthService.generateToken(),
        refresh_token: OauthService.generateToken(),
        expires_at: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      };
      try {
        const token: Oauth = await this.saveData(newToken);
        return Object.assign({}, res, { token });
      } catch (err) {
        console.error('An error occured during token generation');
        console.error(err);
        throw new InternalServerErrorException();
      }
    }
    throw new BadRequestException();
  }

  async refreshToken(refresh_token: string): Promise<any> {
    const isValidRefreshToken = await this.oauthRepository.findOne({
      where: { refresh_token },
    });
    if (isValidRefreshToken) {
      const newToken: OauthDto = {
        fk_user_id: isValidRefreshToken.fk_user_id,
        type: 0,
        token: OauthService.generateToken(),
        refresh_token: OauthService.generateToken(),
        expires_at: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      };
      const token = await this.saveData(newToken);
      if (token) {
        return token;
      }
      throw new InternalServerErrorException();
    }
    throw new BadRequestException();
  }
}
