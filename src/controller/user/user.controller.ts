import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from 'src/application/service';
import { CreateUserDto } from '../../dto/user.dto';

import { RabbitMqServer } from '../../rabbit-mq-server';

@Controller()
export class UserController {
  rabbitConnection: RabbitMqServer;

  constructor(private readonly userService: UserService) {
    this.rabbitConnection = new RabbitMqServer(
      'amqp://myuser:mypassword@0.0.0.0:5672',
    );
  }

  @Post('users')
  @HttpCode(200)
  async create(@Body() payload: CreateUserDto): Promise<any> {
    try {
      const data = await this.userService.create(payload);
      return { success: true, data };
    } catch (error) {
      return error;
    }
  }

  @Get('users')
  @HttpCode(200)
  async list(): Promise<any> {
    try {
      await this.rabbitConnection.start();
      const data = await this.userService.list();
      return { success: true, data };
    } catch (error) {
      return error;
    }
  }
}
