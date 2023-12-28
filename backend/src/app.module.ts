import { Global, Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import typeorm from './global/configs/typeorm.config';
import { LoggerMiddleware } from './global/middlewares/logger.middleware';
import { AzureADStrategy } from './global/guards/azure-ad.guard';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/entities/project.entity';
import { Milestone } from './projects/entities/milestone.entity';
import { UsersModule } from './users/users.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    PassportModule,

    ProjectsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, AzureADStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
