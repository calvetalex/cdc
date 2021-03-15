import {
  Controller,
  Get,
  Param,
  Res,
  Body,
  Delete,
  Put,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserDto } from './users.dto';
import { UserService } from './users.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.findAll();
  }

  @Get(':email')
  async getUserFromEmail(@Param('email') email: string) {
    return (await this.userService.findUserFromEmail(email)) || {};
  }

  @Post()
  async addUser(@Res() res, @Body() body: UserDto) {
    try {
      const data = await this.userService.saveData(body);
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch (err) {
      console.error('[USERS] - An error occured on POST method for User');
      console.error(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'ERROR: impossible to create data',
        status: 400,
      });
    }
  }

  @Put()
  async update(@Res() res, @Body() body: UserDto) {
    try {
      const data = await this.userService.saveData(body);
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch (err) {
      console.error('[USERS] - An error occured on PUT method for User');
      console.error(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'ERROR: impossible to update data',
        status: 400,
      });
    }
  }

  @Delete()
  async removeData(@Res() res, @Body() body: UserDto) {
    try {
      const entity = await this.userService.delete(body);
      return res.status(HttpStatus.OK).json({
        message: 'entity removed',
        entity,
      });
    } catch (err) {
      console.error('[USERS] - An error occured on PUT method for User');
      console.error(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'ERROR: impossible to remove data',
        status: 400,
      });
    }
  }
}
