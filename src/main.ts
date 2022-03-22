import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { RabbitMqServer } from './application/infraestructure/rabbit-mq-server';

import { SES, SNS } from 'aws-sdk';
import { AwsService } from './application/service/aws.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const server = new RabbitMqServer('amqp://myuser:mypassword@0.0.0.0:5672');
  await server.start();
  await server.consume('userCreation', async (message) => {
    const config = {
      region: process.env.AWS_DEFAULT_REGION ?? 'sa-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'any-access-key-id',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'any-secret-key',
      },
    };

    const ses = new SES({ apiVersion: '2010-12-01', ...config });
    const sns = new SNS({ apiVersion: '2010-12-01', ...config });

    const awsService = new AwsService(ses, sns);
    await awsService.exec(JSON.parse(message.content.toString()));
  });

  await app.listen(3000);
}

bootstrap();
