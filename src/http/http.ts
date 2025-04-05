import { HttpStatus } from "@nestjs/common";

export class HttpResponse<T = any> {
    constructor(
      public readonly statusCode: number,
      public readonly message: string,
      public readonly data?: T,
    ) {}
  
    static ok<T>(data?: T, message = 'Success') {
      return new HttpResponse(HttpStatus.OK, message, data);
    }
  
    static created<T>(data?: T, message = 'Resource created') {
      return new HttpResponse(HttpStatus.CREATED, message, data);
    }
  
    static badRequest(message = 'Bad request') {
      return new HttpResponse(HttpStatus.BAD_REQUEST, message);
    }
  
    static notFound(message = 'Not found') {
      return new HttpResponse(HttpStatus.NOT_FOUND, message);
    }
  }
  