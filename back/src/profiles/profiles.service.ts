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
