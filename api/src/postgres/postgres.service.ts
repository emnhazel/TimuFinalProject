import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class PostgresService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'gakygnlj',
      host: 'raja.db.elephantsql.com',
      database: 'gakygnlj',
      password: 'jTsGWy139Vxo3VRrKuMCkowBE_NOAhEd',
      port: 5432,
    });
    this.pool.connect();
  }

  async query(text: string, params?: any[]): Promise<any> {
    return this.pool.query(text, params);
  }

  async executeQuery(query: string, values: any[] = []): Promise<any> {
    try {
      const result = await this.pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw new Error(`Error executing query: ${error}`);
    }
  }
}