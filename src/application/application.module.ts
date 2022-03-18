import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppService, UserService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';

const SERVICES = [AppService, UserService];
const REPOSITORIES = [User];

@Module({
  imports: [
    HttpModule.register({ timeout: 60000 }),
    TypeOrmModule.forFeature([...REPOSITORIES]),
  ],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class ApplicationModule {}
