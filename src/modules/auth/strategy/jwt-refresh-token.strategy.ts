import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';

import {
  JWT_REFRESH_TOKEN_GUARD,
  JWT_REFRESH_TOKEN_SECRET,
} from 'src/common/consts';
import { UserResponse } from 'src/modules/user/response/user.response';

import { AuthService } from '../auth.service';
import TokenPayload from '../interface/token-payload.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH_TOKEN_GUARD,
) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refreshToken;
        },
      ]),
      secretOrKey: configService.get(JWT_REFRESH_TOKEN_SECRET),
      passReqToCallback: true,
    });
  }

  public async validate(
    request: Request,
    payload: TokenPayload,
  ): Promise<UserResponse> {
    return this.authService.getUserIfRefreshTokenMatches(
      request?.cookies?.refreshToken,
      payload.userId,
    );
  }
}
