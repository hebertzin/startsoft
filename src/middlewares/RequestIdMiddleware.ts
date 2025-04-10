import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4();
    const timestamp = new Date().toISOString();

    req['requestId'] = requestId;
    req['timestamp'] = timestamp;

    res.setHeader('X-Request-Id', requestId);

    res.on('finish', () => {
    });

    next();
  }
}