import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { ElasticModuleConfiguration } from './elastic/elastic.module';

describe('AppController', () => {
  let appController: AppController;
  let appRepository: AppRepository;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [ElasticModuleConfiguration],
      controllers: [AppController],
      providers: [AppRepository, AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appRepository = app.get<AppRepository>(AppRepository);
    await appRepository.storePlant({
      id: 1,
      name: 'Sunflower',
      color: 'yellow',
    });
    await appRepository.storePlant({
      id: 2,
      name: 'Poppy',
    });
  });

  afterEach(async () => {
    await appRepository.deleteIndex();
  });

  describe('root', () => {
    it('should return "Ok"', (done) => {
      expect(appController.getOk()).toBe('Ok');
      done();
    });
  });

  describe('getPlant', () => {
    it('should return "Sunflower" plant', async (done) => {
      const plants = await appController.getPlants('Sunflower');
      expect(plants[0].name).toBe('Sunflower');
      done();
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
