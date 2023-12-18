import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import * as compression from 'compression';
import helmet from 'helmet';
import * as cors from 'cors';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AzureADGuard } from './global/guards/azure-ad.guard';

export const rootPath: string = process.cwd();
function initOpenAPI(
  app: INestApplication,
  configService: ConfigService,
): void {
  const config = new DocumentBuilder()
    .setTitle('Hub Innovation Valorizer')
    .setDescription('The REST API description.')
    .setVersion(configService.get('npm_package_version'))
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: false,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('/swagger', app, document);
}

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
  });

  app
    .setGlobalPrefix('')
    .useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
    .useGlobalGuards(new AzureADGuard())
    .use(
      compression(),
      helmet({
        crossOriginResourcePolicy: false,
      }),
      cors({
        origin:
          process.env.NODE_ENV === 'production' ? process.env.FRONT_URL : '*',
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'PATCH', 'DELETE'],
      }),
    );

  const configService = app.get(ConfigService);
  initOpenAPI(app, configService);

  app.enableCors({
    allowedHeaders: [
      'Location',
      'content-type',
      'access-control-allow-headers',
      'Authorization',
    ],
    maxAge: 600,
  });

  app.listen(3000);
}

bootstrap();
