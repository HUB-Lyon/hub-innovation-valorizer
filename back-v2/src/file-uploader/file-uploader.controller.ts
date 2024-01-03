import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('File handling')
@Controller('/file-uploader')
export class FileUploaderController {
  constructor(private fileUploaderService: FileUploaderService) {}

  @Post()
  @HttpCode(201)
  createFile(@Body() data: { content: string }) {
    return this.fileUploaderService.saveFile(data.content);
  }
}
