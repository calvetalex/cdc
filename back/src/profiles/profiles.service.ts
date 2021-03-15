import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profiles } from './entities/profiles.entity';
import { ProfilesDto } from './profiles.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject('PROFILES_REPOSITORY')
    private readonly profilesRepository: Repository<Profiles>,
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

  async getByName(name: string): Promise<Profiles> {
    return this.profilesRepository.findOne({ where: { name } });
  }
}
