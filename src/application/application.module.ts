import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppService, UserService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Code } from 'src/entity/code.entity';
import { AwsSdkModule } from 'nest-aws-sdk';
import { SES, SNS } from 'aws-sdk';

const SERVICES = [AppService, UserService];
const REPOSITORIES = [User, Code];

@Module({
  imports: [
    HttpModule.register({ timeout: 60000 }),
    TypeOrmModule.forFeature([...REPOSITORIES]),
    AwsSdkModule.forFeatures([SES, SNS]),
  ],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class ApplicationModule {}
