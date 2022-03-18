import { Controller, Get } from '@nestjs/common';
import { AppService } from '../../application/service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { success: boolean; data: string } {
    return this.appService.getHello();
  }
}
