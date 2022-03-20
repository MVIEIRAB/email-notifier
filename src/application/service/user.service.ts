import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectAwsService } from 'nest-aws-sdk';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { SES, SNS } from 'aws-sdk';
import { sendEmail } from '../../utils/emailSend.utils';

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
    const makeEmailSendParams = sendEmail(
      'mavb.financas@gmail.com',
      'Cadastro de Usuário',
      'Olá, você foi cadastrado com sucesso! \n\nAcesse o link: http://localhost:3000/auth/confirm/',
    );

    await this.ses
      .sendEmail(makeEmailSendParams)
      .promise()
      .then()
      .catch((err) => console.error(err));

    return this.usersRepository.save(user);
  }

  async list(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
