import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Plant } from './models/plant.model';

@Controller('/plant/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getOk(): string {
    return this.appService.getOk();
  }

  @Get(':search')
  async getPlants(@Param('search') search: string): Promise<Plant[]> {
    return await this.appService.getPlants(search);
  }

  @Post()
  async addPlant(@Body() plantBody: Plant): Promise<Plant> {
    return await this.appService.storePlant(plantBody);
  }
}
