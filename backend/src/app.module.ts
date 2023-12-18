import { Global, Module,MiddlewareConsumer, NestModule } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {LoggerMiddleware} from "./utils/middlewares/logger.middleware";

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}