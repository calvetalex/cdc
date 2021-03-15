import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Profiles } from './entities/profiles.entity';
import { ProfilesDto } from './profiles.dto';
import { ProfilesService } from './profiles.service';

@Controller('/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async getAll(): Promise<Profiles[]> {
    return await this.profilesService.getAll();
  }

  @Get(':name')
  async getByName(@Param('name') name: string): Promise<Profiles> {
    return await this.profilesService.getByName(name);
  }

  @Put()
  @Post()
  async createProfile(
    @Res() res,
    @Body() body: ProfilesDto,
  ): Promise<Profiles> {
    try {
      const newProfile = this.profilesService.saveData(body);
      return res.status(HttpStatus.OK).json({
        newProfile,
      });
    } catch (e) {
      console.error('CANNOT CREATE NEW PROFILE', e);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'An error occurred',
        status: 400,
      });
    }
  }

  @Delete()
  async deleteProfile(@Res() res, @Body() body: ProfilesDto) {
    try {
      const entity = await this.profilesService.delete(body);
      return res.status(HttpStatus.OK).json({
        message: 'entity removed',
        entity,
      });
    } catch (err) {
      console.error('An error occurred on PUT method for User');
      console.error(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'ERROR: impossible to remove data',
        status: 400,
      });
    }
  }
}