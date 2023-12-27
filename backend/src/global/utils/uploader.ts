import { v4 as uuidv4 } from 'uuid';

import { rename, unlinkSync } from 'fs';
import { fromFile } from 'file-type';
import * as resizeOptimizeImages from 'resize-optimize-images';

type File = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

export class Uploader {
    static checkFormat(mimeType: string, allowedType: string[]) {
        return !!allowedType.find(a => a === mimeType);
    }
    
    static checkFile = async (file: File) => {
        const allowedMime: string = 'image/png';
        if (file.mimetype !== allowedMime) {
            throw new Error('Bad file type');
        }
        const check = await fromFile(file.path);
        if (check.mime !== allowedMime) {
            throw new Error('Bad file type');
        }
    };

  static async handlePublicFile(file: File) {
      try {
          await this.checkFile(file);
      } catch (e) {
          this.removeFile(file.path);
          throw e;
      }
      const fileName = `${uuidv4()}.png`;
      const publicPath: string = `upload/public/${fileName}`;
      rename(file.path, publicPath, function (err) {
          if (err) throw err;
      });

      await resizeOptimizeImages({
          images: [publicPath],
          width: 400,
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