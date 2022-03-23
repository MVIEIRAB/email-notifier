import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Code } from 'src/entity/code.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { sendEmail } from '../../utils/emailSend.utils';
import * as moment from 'moment';

import { RabbitMqServer } from '../infraestructure';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id: number;
}

@Injectable()
export class UserService {
  private rabbitConnection: RabbitMqServer;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Code)
    private readonly codeRepository: Repository<Code>,
  ) {
    this.rabbitConnection = new RabbitMqServer(
      'amqp://myuser:mypassword@0.0.0.0:5672',
    );
  }

  async create(user: any = {}): Promise<User> {
    try {
      const response: IUser = await this.usersRepository.save(user);

      const makeEmailSendParams = sendEmail(
        response.email,
        'Cadastro de Usuário',
        'Olá, você foi cadastrado com sucesso! \n\nAcesse o link: http://localhost:3000/auth/confirm/',
      );

      await this.rabbitConnection.start();
      await this.rabbitConnection.pubToQueue(
        'userCreation',
        JSON.stringify({ type: 'email', payload: makeEmailSendParams }),
      );

      return response;
    } catch (error) {
      return error;
    }
  }

  async sendVerificationCode(id: number) {
    try {
      const response: IUser = await this.usersRepository.findOneBy({ id });

      const code = parseInt(Math.random() * 100000 + '', 10).toString();

      await this.codeRepository.save({
        code,
        userId: response.id,
        expireAt: new Date().toISOString(),
      });

      const makeEmailCodeSendParams = sendEmail(
        response.email,
        'Código de verificação',
        `Seu código para verificação foi gerado: \n\n\n${code}`,
      );

      await this.rabbitConnection.start();
      await this.rabbitConnection.pubToQueue(
        'userCreation',
        JSON.stringify({ type: 'email', payload: makeEmailCodeSendParams }),
      );

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async setPassword(payload: any, id: number) {
    try {
      const codeResponse = await this.codeRepository.findOneBy({
        code: payload.code,
        userId: id,
      });

      const validateCodeGenerated = moment(codeResponse.expireAt).isBefore(
        new Date().toISOString(),
      );

      if (!validateCodeGenerated) {
        throw new Error('Código inválido');
      }

      await this.usersRepository.update(
        { id: codeResponse.userId },
        { password: payload.password },
      );

      return codeResponse;
    } catch (error) {
      return error;
    }
  }

  async list(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async listCodes(): Promise<any> {
    const code = await this.codeRepository.findBy({ userId: 26 });
    return code;
  }
}
