import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionHandler extends HttpException {
  constructor(
    response: { message: string; subCode?: string; data?: object },
    status: number,
  ) {
    super(response, status);
  }
}

export function throwInternalError() {
  throw new ExceptionHandler(
    {
      message: 'An error occured',
      subCode: 'E_ERROR',
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}

export function throwNotFound() {
  throw new ExceptionHandler(
    {
      message: 'Not found',
      subCode: 'E_NOT_FOUND',
    },
    HttpStatus.NOT_FOUND,
  );
}

export function throwBadFormat(info: string) {
  throw new ExceptionHandler(
    {
      message: 'Bad format: ' + info,
      subCode: 'E_BAD_FORMAT',
    },
    HttpStatus.BAD_REQUEST,
  );
}

export function throwInvalidToken() {
  throw new ExceptionHandler(
    {
      message: 'Access denied',
      subCode: 'E_INVALID_TOKEN',
    },
    HttpStatus.UNAUTHORIZED,
  );
}

export function throwInvalidUserAccess() {
  throw new ExceptionHandler(
    {
      message: 'Access denied',
      subCode: 'E_USER_ACCESS',
    },
    HttpStatus.UNAUTHORIZED,
  );
}

export function throwUploadError() {
  throw new ExceptionHandler(
    {
      message: 'Upload failed.',
      subCode: 'E_UPLOAD_FAILED',
    },
    HttpStatus.BAD_REQUEST,
  );
}
