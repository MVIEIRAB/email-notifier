import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(user: any = {}): Promise<User> {
    return this.usersRepository.save(user);
  }

  async list(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
