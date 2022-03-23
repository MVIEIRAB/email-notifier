import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppService, UserService, AwsService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Code } from 'src/entity/code.entity';
import { AwsSdkModule } from 'nest-aws-sdk';
import { SES } from 'aws-sdk';

const SERVICES = [AppService, UserService, AwsService];
const REPOSITORIES = [User, Code];

@Module({
  imports: [
    HttpModule.register({ timeout: 60000 }),
    TypeOrmModule.forFeature([...REPOSITORIES]),
    AwsSdkModule.forFeatures([SES]),
  ],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class ApplicationModule {}
