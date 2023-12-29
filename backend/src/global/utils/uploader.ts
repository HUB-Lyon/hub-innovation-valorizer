import { v4 as uuidv4 } from 'uuid';
import { writeFileSync, unlinkSync } from 'fs';
import { fromFile } from 'file-type';
import * as resizeOptimizeImages from 'resize-optimize-images';
import { Image } from '../../projects/dto/create-project.dto'


export class Uploader {
    
    static _base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

  static async handlePublicFile(image: Image) {
      const fileName = `${uuidv4()}.png`;
      const publicPath: string = `upload/public/${fileName}`;
      const data = image.content.replace(/^data:image\/\w+;base64,/, "");
      writeFileSync(publicPath, Buffer.from(data, 'base64'));

      await resizeOptimizeImages({
          images: [publicPath],
          width: 666,
          quality: 100
      });
      return `/images/public/${fileName}`;
  }

    static removeFile(path, patchPath = false) {
      unlinkSync(patchPath ? path.replace('/images', 'upload') : path);
  }

    static temporaryPath(req, file, cb: any) {
      cb(null, './upload/tmp/');
  }
}