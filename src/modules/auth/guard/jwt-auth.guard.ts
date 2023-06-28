import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common/exceptions';
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

  handleRequest(
    error: Error,
    user: User,
    info: string,
    context: ExecutionContext,
  ): any {
    if (!user) {
      throw new UnauthorizedException('Authentication token is missing.');
    }

    const className = context.getClass().name;
    const requestMethod = context.switchToHttp().getRequest<Request>().method;
    const permissionContext = context.getHandler().name;

    if (
      !user.role.permissions.find(
        (permission) =>
          permission.descriptor === className &&
          permission.method === requestMethod &&
          (permission.context === undefined ||
            permission.context === permissionContext),
      )
    ) {
      throw new ForbiddenException('Not enough permissions.');
    }

    return user;
  }
}
