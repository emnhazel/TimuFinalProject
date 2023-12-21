import { Controller, Get, Post, Param, Body, Put, Delete,  } from "@nestjs/common";
import { FactoryDetail } from './factory-detail.model';
import { FactoryDetailService } from "./factory-detail.service";
//import { JwtMiddleware } from "../middleware/jwt.middleware";

@Controller('factory-detail')
//@UseGuards(JwtMiddleware)
export class FactoryDetailController {
  constructor(private readonly factoryDetailService: FactoryDetailService) {}

  @Get('')
  async getAllFactories(): Promise<FactoryDetail[]> {
    return await this.factoryDetailService.getAllFactories();
  }

  @Get(':id')
  async getFactoryById(@Param('id') id: number): Promise<FactoryDetail> {
    return await this.factoryDetailService.getFactoryById(id);
  }

  @Post()
  async createFactory(@Body() factory: FactoryDetail): Promise<FactoryDetail> {
    return await this.factoryDetailService.createFactory(factory);
  }

  @Put(':id')
  async updateFactory(@Param('id') id: number, @Body() factory: FactoryDetail): Promise<FactoryDetail> {
   
    return await this.factoryDetailService.updateFactory(id, factory);
  }

  @Delete(':id')
  async deleteFactory(@Param('id') id: number): Promise<void> {
    return await this.factoryDetailService.deleteFactory(id);
  }
}
