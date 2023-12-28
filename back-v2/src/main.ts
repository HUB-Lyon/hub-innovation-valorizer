import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AzureADGuard } from './middlewares/auth';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector: Reflector = app.get(Reflector);

  app.useStaticAssets(`${process.cwd()}/public/`);
  app.useGlobalGuards(new AzureADGuard(reflector));
  await app.listen(3000);
}
bootstrap();
