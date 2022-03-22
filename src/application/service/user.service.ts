import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { sendEmail } from '../../utils/emailSend.utils';

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

  async sendVerificationCode() {
    try {
      // implement sms send with code
    } catch (error) {
      return error;
    }
  }

  async setPassword() {
    try {
      // implement password set with verified code
    } catch (error) {
      return error;
    }
  }

  async list(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
