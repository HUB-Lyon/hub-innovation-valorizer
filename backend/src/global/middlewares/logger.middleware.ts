import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { writeFile } from 'fs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  fileTest(request: Request, response: Response): string {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('member-agent') || '';
    const { statusCode } = response;
    const contentLength = response.get('content-length');

    let content = '';

    content = content.concat('Method: ', method, '\n');
    content = content.concat('Url: ', originalUrl, '\n');
    content = content.concat('Status Code: ', statusCode.toString(), '\n');
    content = content.concat('Content Length: ', contentLength, '\n');
    content = content.concat('User agent: ', userAgent, '\n');
    content = content.concat('IP: ', ip, '\n');
    content = content.concat('\nHeaders: {\n');
    Object.keys(request.headers).forEach((headerKey) => {
      content = content.concat(
        `\t${headerKey}: ${request.headers[headerKey]}\n`,
      );
    });
    content = content.concat('}\n');
    content = content.concat('\nBody: {\n');
    Object.keys(request.body).forEach((bodyKey) => {
      content = content.concat(`\t${bodyKey}: ${request.body[bodyKey]}\n`);
    });
    content = content.concat('}\n');
    return content;
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const requestTime = Date.now();

    response.on('finish', () => {
      const { statusCode } = response;
      const responseTime = Date.now();

      if (statusCode >= 500) {
        this.logger.error(
          `${method} ${originalUrl} ${statusCode} [${ip}] - ${
            responseTime - requestTime
          }ms`,
        );
        const _this = this;
        writeFile(
          `log/${requestTime}`,
          this.fileTest(request, response),
          function (err) {
            if (err) throw err;
            _this.logger.error(`Error files created - ${requestTime}`);
          },
        );
      } else if (statusCode >= 400) {
        this.logger.warn(
          `${method} ${originalUrl} ${statusCode} [${ip}] - ${
            responseTime - requestTime
          }ms`,
        );
      } else {
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} [${ip}] - ${
            responseTime - requestTime
          }ms`,
        );
      }
    });

    next();
  }
}
