import { Injectable } from '@nestjs/common';
import { Factory } from './factory.model';
import { PostgresService } from "../postgres/postgres.service";

@Injectable()
export class FactoryService {
  constructor(private readonly postgresService: PostgresService) {}

  async getAllFactories(): Promise<Factory[]> {
    const query = 'SELECT * FROM factory';
    return this.postgresService.executeQuery(query);
  }

  async getFactoryById(id: number): Promise<Factory> {
    const query = 'SELECT * FROM factory WHERE id = $1';
    const values = [id];
    return this.postgresService.executeQuery(query, values);
  }

  async createFactory(factory: Factory): Promise<Factory> {
    const query = 'INSERT INTO factory (company_name, membership_start_date,membership_end_date,number_of_employees,free_member) VALUES ($1, $2,$3,$4,$5) RETURNING *';
    const values = [factory.company_name, factory.membership_start_date,factory.membership_end_date,factory.number_of_employees,factory.free_member];
    return this.postgresService.executeQuery(query, values);
  }

  async updateFactory(id: number, factory: Factory): Promise<Factory> {
    const query = 'UPDATE factory SET company_name = $1, membership_start_date = $2, membership_end_date = $3,number_of_employees = $4, free_member = $5  WHERE id = $6 RETURNING *';
    const values = [factory.company_name, factory.membership_start_date, factory.membership_end_date,factory.number_of_employees,factory.free_member, id];
    return this.postgresService.executeQuery(query, values);
  }

  async deleteFactory(id: number): Promise<void> {
    const query = 'DELETE FROM factory WHERE id = $1';
    const values = [id];
    return await this.postgresService.executeQuery(query, values);
  }
}
