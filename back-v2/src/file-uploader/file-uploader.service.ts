import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileUploaderService {
  saveFile(data: string) {
    const fileName = `${uuidv4()}.png`;
    data = data.replace(/^data:image\/\w+;base64,/, '');
    writeFileSync(
      `${process.cwd()}/public/${fileName}`,
      Buffer.from(data, 'base64'),
      { flag: 'w+' },
    );
    return fileName;
  }
}
