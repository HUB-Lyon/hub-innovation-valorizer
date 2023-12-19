import { Global, Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './global/middlewares/logger.middleware';
import { AzureADStrategy } from './global/guards/azure-ad.guard';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule
  ],
  controllers: [AppController],
  providers: [AppService, AzureADStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
