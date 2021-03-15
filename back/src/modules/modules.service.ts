import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Modules } from './entities/modules.entity';
import { ModulesDto } from './modules.dto';
import { ServicesService } from 'src/services/services.service';

@Injectable()
export class ModulesService {
    constructor(
        @Inject('MODULES_REPOSITORY')
        private readonly modulesRepository: Repository<Modules>,
        private readonly servicesService: ServicesService,
    ) {}

    async saveData(action: ModulesDto): Promise<Modules> {
        return this.modulesRepository.save(action);
    }

    async delete(action: ModulesDto): Promise<any> {
        return this.modulesRepository.delete(action);
    }

    async getAll(): Promise<Modules[]> {
        return this.modulesRepository.find();
    }

    async getForProfile(id: number): Promise<any[]> {
        let modules: Modules[] = await this.modulesRepository.find({ where: { fk_parent_id: id } });
        return await Promise.all(modules.map(async (elem) => {
            if (elem.split !== 0) {
                const subModules = await this.getForProfile(elem.id);
                return { ...elem, subModules };
            } else {
                const services = await this.servicesService.getForModule(elem.id);
                if (services.length !== 0) {
                    return { ...elem, services };
                }
            }
            return elem;
        })).catch(e => { throw e; });
    }
}