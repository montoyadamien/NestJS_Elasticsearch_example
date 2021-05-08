import { Injectable } from '@nestjs/common';
import { Plant } from './models/plant.model';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class AppRepository {
  private readonly INDEX = 'garden-plants';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  public async storePlant(plant: Plant): Promise<Plant> {
    const res = await this.elasticsearchService.index({
      index: this.INDEX,
      body: plant,
    });
    if (res.body.result === 'created') {
      await this.elasticsearchService.indices.refresh({ index: this.INDEX });
      return plant;
    }
    return null;
  }

  public async getPlants(search): Promise<Plant[]> {
    const { body } = await this.elasticsearchService.search({
      index: this.INDEX,
      body: {
        query: {
          multi_match: {
            query: search,
            fields: ['name^2', 'color'], // ^ allows to weight the field
          },
        },
        _source: ['id', 'name'], // only return id and name fields
      },
    });
    const results: Plant[] = [];
    body.hits.hits.forEach((value) => {
      results.push(value._source);
    });
    return results;
  }

  public async deleteIndex(): Promise<any> {
    await this.elasticsearchService.indices.delete({
      index: this.INDEX,
    });
  }
}
