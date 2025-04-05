import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Problem Details response following RFC 9457 format
    // This standardized structure provides a machine-readable and human-readable error format.
    // More info: https://www.rfc-editor.org/rfc/rfc9457.html
    const problemDetails = {
      title: exception.name || 'Internal Server Error',
      status: status,
      detail:
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || 'An unexpected error occurred',
      instance: request.url,
    };

    response.status(status).json(problemDetails);
  }
}