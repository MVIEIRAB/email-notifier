import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppService } from './service';

const SERVICES = [AppService];

@Module({
  imports: [HttpModule.register({ timeout: 60000 })],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class ApplicationModule {}
