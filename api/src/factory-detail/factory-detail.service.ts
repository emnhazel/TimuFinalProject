import { Injectable } from '@nestjs/common';
import { FactoryDetail } from './factory-detail.model';
import { PostgresService } from "../postgres/postgres.service";

@Injectable()
export class FactoryDetailService {
  constructor(private readonly postgresService: PostgresService) {}

  async getAllFactories(): Promise<FactoryDetail[]> {
    const query = 'SELECT * FROM factory_detail';
    return this.postgresService.executeQuery(query);
  }

  async getFactoryById(id: number): Promise<FactoryDetail> {
  

    const query = 'SELECT * FROM factory_detail WHERE factory_id = $1';
    const values = [id];
    return this.postgresService.executeQuery(query, values);
  }

  async createFactory(factory: FactoryDetail): Promise<FactoryDetail> {

    const query = 'INSERT INTO factory_detail (factory_id, usage_unit,date_range,usage,usage_fee,disc_price) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *';
    const values = [factory.factoryId, factory.usage_unit,factory.date_range,factory.usage,factory.usage_fee,factory.disc_price];
    return this.postgresService.executeQuery(query, values);
  }

  async updateFactory(id: number, factory: FactoryDetail): Promise<FactoryDetail> {
    const query = 'UPDATE factory_detail SET usage_unit = $1, date_range = $2, usage = $3,usage_fee = $4, disc_price = $5  WHERE id = $6 RETURNING *';

    const values = [factory.usage_unit,factory.date_range,factory.usage,factory.usage_fee,factory.disc_price,id];
    return this.postgresService.executeQuery(query, values);
  }

  async deleteFactory(id: number): Promise<void> {
    const query = 'DELETE FROM factory_detail WHERE id = $1';
    const values = [id];
    return await this.postgresService.executeQuery(query, values);
  }
}
