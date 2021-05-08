import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { Plant } from './models/plant.model';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  getOk(): string {
    return 'Ok';
  }

  async storePlant(plant: Plant): Promise<Plant> {
    return this.appRepository.storePlant(plant);
  }

  async getPlants(plantName: string): Promise<Plant[]> {
    return this.appRepository.getPlants(plantName);
  }
}
