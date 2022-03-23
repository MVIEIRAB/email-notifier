import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
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
      const codes = await this.userService.listCodes();
      return { success: true, data: { data, codes } };
    } catch (error) {
      return error;
    }
  }

  @Post('users/set-password/:id')
  @HttpCode(200)
  async setPassword(@Body() body: any, @Param('id') id: number): Promise<any> {
    try {
      await this.userService.setPassword(body, id);
      return { success: true };
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('users/send-verification-code/:id')
  @HttpCode(200)
  async sendVerificationCode(@Param('id') id: number): Promise<any> {
    try {
      await this.userService.sendVerificationCode(id);
      return { success: true };
    } catch (error) {
      return error;
    }
  }
}
