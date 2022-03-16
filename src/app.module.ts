import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './application/service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
