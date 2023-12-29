import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AzureADGuard } from './middlewares/auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector: Reflector = app.get(Reflector);

  app.useStaticAssets(`${process.cwd()}/public/`);
  app.useGlobalGuards(new AzureADGuard(reflector));

  const config = new DocumentBuilder()
    .setTitle('HUB Innovation Valorizer')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
