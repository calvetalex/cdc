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
import { ModulesService } from './modules.service';
import { Modules } from './entities/modules.entity';
import { ModulesDto } from './modules.dto';

@Controller('/modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Get()
  async getAll(): Promise<Modules[]> {
    return await this.modulesService.getAll();
  }

  @Get('/linkedTo/:id')
  async getModulesForProfile(@Param('id') id: number): Promise<any[]> {
    try {
      return await this.modulesService.getForProfile(id);
    } catch (e) {
      console.error(`[MODULES] - CANNOT GET MODULES FOR PROFILE ${id}`, e);
      return [];
    }
  }

  @Put()
  @Post()
  async createOrUpdate(@Res() res, @Body() body: ModulesDto): Promise<Modules> {
    try {
      const data = await this.modulesService.saveData(body);
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch (e) {
      console.error(`[MODULE] - CANNOT CREATE DATA`, e);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'ERROR: cannot create data',
        status: 400,
      });
    }
  }

  @Delete()
  async delete(@Res() res, @Body() body: ModulesDto): Promise<any> {
    try {
      const entity = await this.modulesService.delete(body);
      return res.status(HttpStatus.OK).json({
        entity,
      });
    } catch (e) {
      console.error(`[MODULE] - CANNOT DELETE DATA`, e);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'ERROR: data not found',
        status: 400,
      });
    }
  }
}
