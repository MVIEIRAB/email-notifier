import { Module } from '@nestjs/common';
import { AppController, UserController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from './application/application.module';

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
    ApplicationModule,
  ],
  controllers,
  providers,
})
export class AppModule {}
