import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { UserDto } from './users.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<Users>,
  ) {}

  async saveData(action: UserDto): Promise<Users> {
    return this.userRepository.save(action);
  }

  async delete(action: UserDto) {
    return this.userRepository.delete(action);
  }

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findUserFromEmail(email: string): Promise<Users> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async findUserByID(id: number): Promise<Users> {
    return this.userRepository.findOne({ where: { id } });
  }

  async isUser(email: string, password: string): Promise<Users> {
    return this.userRepository.findOne({ where: { email, password } });
  }
}
