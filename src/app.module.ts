import { Module } from '@nestjs/common';
import { AppController, UserController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from './application/application.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import { SES, SNS } from 'aws-sdk';

const controllers = [AppController, UserController];
const providers = [];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db./project_database.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        region: 'us-east-1',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'any',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'any',
        },
      },
      services: [SES, SNS],
    }),
    ApplicationModule,
  ],
  controllers,
  providers,
})
export class AppModule {}
