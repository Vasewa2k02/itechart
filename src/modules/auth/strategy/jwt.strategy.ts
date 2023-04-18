import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JWT_ACCESS_TOKEN_SECRET } from 'src/common/consts';
import { UserResponse } from 'src/modules/user/response/user.response';
import { UserService } from 'src/modules/user/user.service';

import TokenPayload from '../interface/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(JWT_ACCESS_TOKEN_SECRET),
      ignoreExpiration: false,
    });
  }

  public async validate(payload: TokenPayload): Promise<UserResponse | null> {
    return await this.userService.getUserById(payload.userId);
  }
}
