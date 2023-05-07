import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, NextFunction } from 'express';

import RequestWithUser from 'src/modules/auth/interface/request-with-user.interface';
import { WinstonLoggerService } from 'src/modules/winston-logger/winston-logger.service';
import { APP_ENVIRONMENT } from 'src/modules/winston-logger/constants/params';

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

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   constructor(
//     private loggerService: WinstonLoggerService,
//     private configService: ConfigService,
//   ) {}

//   use(req: RequestWithUser, res: Response, next: NextFunction) {
//     const originalSend = res.send;

//     (res.send as any) = (body: unknown) => {
//       const resPayload = `[STATUS_CODE] ${res.statusCode} [BODY] ${body}`;

//       this.loggerService.log(
//         getLogInformation(
//           String(this.configService.get(APP_ENVIRONMENT)),
//           req,
//           resPayload,
//         ),
//       );

//       originalSend.call(this, body);
//     };

//     next();
//   }
// }
