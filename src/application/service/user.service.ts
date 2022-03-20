import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectAwsService } from 'nest-aws-sdk';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { SES, SNS } from 'aws-sdk';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectAwsService(SES)
    private readonly ses: SES,

    @InjectAwsService(SNS)
    private readonly sns: SNS,
  ) {}

  async create(user: any = {}): Promise<User> {
    return this.usersRepository.save(user);
  }

  async list(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
