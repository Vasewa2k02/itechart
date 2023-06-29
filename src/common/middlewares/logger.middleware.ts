import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, NextFunction } from 'express';

import RequestWithUser from 'modules/auth/interface/request-with-user.interface';
import { WinstonLoggerService } from 'modules/winston-logger/winston-logger.service';
import { APP_ENVIRONMENT } from 'modules/winston-logger/constants/params';

import { getRequestInformation } from '../constants/logger-info';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private loggerService: WinstonLoggerService,
    private configService: ConfigService,
  ) {}

  use(req: RequestWithUser, res: Response, next: NextFunction) {
    this.loggerService.log(
      getRequestInformation(
        String(this.configService.get(APP_ENVIRONMENT)),
        req,
      ),
    );

    next();
  }
}
