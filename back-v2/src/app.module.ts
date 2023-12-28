import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './projects/project.module';
import { ProjectController } from './projects/project.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileUploaderController } from './file-uploader/file-uploader.controller';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { AzureADStrategy } from './middlewares/auth';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProjectModule,
    FileUploaderModule,
    PassportModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/public',
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, ProjectController, FileUploaderController],
  providers: [AppService, AzureADStrategy],
})
export class AppModule {}
