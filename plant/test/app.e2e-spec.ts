import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppRepository } from '../src/app.repository';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appRepository: AppRepository;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    appRepository = app.get<AppRepository>(AppRepository);
    await appRepository.storePlant({
      id: 1,
      name: 'Sunflower',
    });
    await appRepository.storePlant({
      id: 2,
      name: 'Poppy',
    });
  });

  afterEach(async () => {
    await appRepository.deleteIndex();
  });

  it('/plant/ (GET)', () => {
    return request(app.getHttpServer()).get('/plant/').expect(200).expect('Ok');
  });

  it('/plant/:plantName (GET)', () => {
    return request(app.getHttpServer())
      .get('/plant/Sunflower')
      .expect(200)
      .expect('[{"id":1,"name":"Sunflower"}]');
  });

  afterEach(async () => {
    await moduleFixture.close();
    await app.close();
  });
});
