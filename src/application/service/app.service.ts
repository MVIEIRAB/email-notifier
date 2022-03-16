import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { success: boolean; data: string } {
    return { success: true, data: 'Hello World!' };
  }
}
