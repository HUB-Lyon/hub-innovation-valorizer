import { Body, Controller, Post } from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('File handling')
@Controller('/file-uploader')
export class FileUploaderController {
  constructor(private fileUploaderService: FileUploaderService) {}

  @Post('/')
  createFile(@Body() data: { name: string; content: string }) {
    return this.fileUploaderService.saveFile(data.content);
  }
}
