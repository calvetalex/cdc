import {
  Controller,
  Get,
  Res,
  Body,
  HttpStatus,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { Services } from './entities/services.entity';
import { ServicesDto } from './services.dto';
import { ServicesService } from './services.service';

@Controller('/services')
export class ServicesControllers {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getAll(): Promise<Services[]> {
    return await this.servicesService.getAll();
  }

  @Get('/parent/:id')
  async getByParent(@Param('id') id: number): Promise<Services[]> {
    return await this.servicesService.getByModule(id);
  }

  @Post()
  async createService(@Res() res, @Body() body: ServicesDto) {
    try {
      const data = await this.servicesService.saveData(body);
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch (err) {
      console.error('CANNOT ADD SERVICE', err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'ERROR',
        status: 400,
      });
    }
  }

  @Put()
  async update(@Res() res, @Body() body: ServicesDto) {
    try {
      const data = await this.servicesService.saveData(body);
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch (err) {
      console.error('CANNOT ADD SERVICE', err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'ERROR',
        status: 400,
      });
    }
  }

  @Delete()
  async removeData(@Res() res, @Body() body: ServicesDto) {
    try {
      const entity = await this.servicesService.delete(body);
      return res.status(HttpStatus.OK).json({
        message: 'entity removed',
        entity,
      });
    } catch (err) {
      console.error('An error occured on PUT method for User', err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'ERROR: impossible to remove data',
        status: 400,
      });
    }
  }
}
