import { Module } from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';
import { FileUploaderController } from './file-uploader.controller';

@Module({
  imports: [],
  providers: [FileUploaderService, FileUploaderController],
  exports: [FileUploaderService],
})
export class FileUploaderModule {}
