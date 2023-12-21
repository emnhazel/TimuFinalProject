import { Module ,NestModule, MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PostgresService } from './postgres/postgres.service';
import { ConfigModule } from '@nestjs/config';
import { FactoryService } from './factory/factory.service';
import { FactoryController } from './factory/factory.controller';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { SearchModule } from './search/search.module';
import { FactoryDetailController } from './factory-detail/factory-detail.controller';
import { FactoryDetailService } from './factory-detail/factory-detail.service';




@Module({
  imports: [ConfigModule.forRoot(),SearchModule],
  controllers: [AppController, UserController, FactoryController,FactoryDetailController],
  providers: [AppService, UserService,PostgresService, FactoryService, FactoryDetailService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes();
  }
}
