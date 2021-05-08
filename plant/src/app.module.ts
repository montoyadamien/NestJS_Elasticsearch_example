import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { ElasticModuleConfiguration } from './elastic/elastic.module';

@Module({
  imports: [ElasticModuleConfiguration],
  controllers: [AppController],
  providers: [AppRepository, AppService],
})
export class AppModule {}
