import { Injectable, Inject } from '@nestjs/common';
import { ModulesService } from 'src/modules/modules.service';
import { Repository } from 'typeorm';
import { Profiles } from './entities/profiles.entity';
import { ProfilesDto } from './profiles.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject('PROFILES_REPOSITORY')
    private readonly profilesRepository: Repository<Profiles>,
    private readonly modulesService: ModulesService,
  ) {}

  async saveData(action: ProfilesDto): Promise<Profiles> {
    return this.profilesRepository.save(action);
  }

  async delete(action: ProfilesDto): Promise<any> {
    return this.profilesRepository.delete(action);
  }

  async getAll(): Promise<Profiles[]> {
    return this.profilesRepository.find();
  }

  async linkModule(id, modules, services) {
    console.log("NEW CALL")
    const res = await Promise.all(
      modules.filter(m => m.fk_parent_id === id).map(async (module) => {
        if (!module.split) {
          console.log(module.id)
          const linked = services.filter(
            (s) => s.fk_module_id === module.id,
          )[0];
          console.log('', linked)
          if (!linked) {
            return null;
          }
          const {id, ...service} = linked;
          try {
            const {id, ...res} = module;
            const subModule = await this.modulesService.createModuleAndService({
              module: res,
              service,
            });
            if (!subModule) {
              throw new Error('[MODULE] - cannot save module');
            }
            return subModule;
          } catch (e) {
            console.log('[PROFILE] - Error when creating subModule', e);
            return null;
          }
        }
        const {id, ...data} = module;
        const subModule = await this.modulesService.saveData(data);
        modules = modules.map(m => m.fk_parent_id === id ? { ...m, fk_parent_id: subModule.id } : m);
        return await this.linkModule(subModule.id, modules, services);
      }),
    ).catch((e) => console.log(e));
    return res;
  }

  async createProfileAndModules(body: any) {
    try {
      const { name } = body;
      const profile = await this.saveData({ name });
      if (!profile) {
        throw new Error('Data already exist');
      }
      body.modules = body.modules.map(m => m.fk_parent_id === body.id ? {...m, fk_parent_id: profile.id} : m);
      const subModules = await this.linkModule(profile.id, body.modules, body.services);
      return { profile, subModules };
    } catch (e) {
      console.error(`[PROFILES] - Error in creating data`, e);
      return {};
    }
  }

  async getByName(name: string): Promise<any> {
    const profile = await this.profilesRepository.findOne({ where: { name } });
    try {
      const subModules = await this.modulesService.getForProfile(profile.id);
      return { profile, subModules };
    } catch (e) {
      console.error(
        `[PROFILES] - CANNOT LOAD PROFILE ${name} AND HIS MODULES`,
        e,
      );
      return null;
    }
  }
}
