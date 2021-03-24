import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Services } from './entities/services.entity';
import { ServicesDto } from './services.dto';

@Injectable()
export class ServicesService {
  constructor(
    @Inject('SERVICES_REPOSITORY')
    private readonly servicesRepository: Repository<Services>,
  ) {}

  async saveData(action: ServicesDto): Promise<Services> {
    return this.servicesRepository.save(action);
  }

  async delete(action: ServicesDto): Promise<any> {
    return this.servicesRepository.delete(action);
  }

  async getAll(): Promise<Services[]> {
    return this.servicesRepository.find();
  }

  async getForModule(moduleId: number): Promise<Services[]> {
    return this.servicesRepository.find({ where: { fk_module_id: moduleId } });
  }
}
