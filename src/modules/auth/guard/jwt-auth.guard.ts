import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'src/modules/user/entities/user.entity';

import { JWT } from '../constants/guard';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT) implements CanActivate {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(error: Error, user: User): any {
    if (!user) {
      throw new UnauthorizedException('Authentication token is missing.');
    }

    return user;
  }
}
