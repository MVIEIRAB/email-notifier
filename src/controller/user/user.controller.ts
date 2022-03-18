import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from 'src/application/service';
import { CreateUserDto } from '../../dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

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
      const data = await this.userService.list();
      return { success: true, data };
    } catch (error) {
      return error;
    }
  }
}
