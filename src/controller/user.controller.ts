import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/application/service';
import { CreateUserDto } from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async create(
    @Body() payload: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return res.status(200).json(await this.userService.create(payload));
    } catch (error) {
      return error;
    }
  }

  @Get('users')
  async list(@Res() res: Response): Promise<any> {
    try {
      return res.status(200).json(await this.userService.list());
    } catch (error) {
      return error;
    }
  }
}
