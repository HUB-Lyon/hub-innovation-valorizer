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
import { AzureADGuard, AzureADStrategy } from './guards/auth';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { User, UserSchema } from './users/schema/user.schema';
import { UserModule } from './users/user.module';
import { UserController } from './users/user.controller';

@Module({
  imports: [
    ProjectModule,
    UserModule,
    FileUploaderModule,
    PassportModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/public',
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [
    AppController,
    UserController,
    ProjectController,
    FileUploaderController,
  ],
  providers: [
    AppService,
    AzureADStrategy,
    {
      provide: APP_GUARD,
      useClass: AzureADGuard,
    },
  ],
})
export class AppModule {}
