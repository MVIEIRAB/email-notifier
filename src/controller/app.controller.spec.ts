import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '.';
import { AppService } from '../application/service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return { success: true, data: "Hello World!" }', () => {
      expect(appController.getHello()).toStrictEqual({
        success: true,
        data: 'Hello World!',
      });
    });
  });
});
