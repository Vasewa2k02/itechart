import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { AuthGuard } from '@nestjs/passport';

import { JWT_GUARD } from 'src/common/consts';
import { Permission } from 'src/entities/permission.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_GUARD) implements CanActivate {
  constructor() {
    super();
  }

  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  public handleRequest(
    error: Error,
    user: User,
    info: string,
    context: ExecutionContext,
  ): any {
    if (!user) {
      throw new ForbiddenException('Authentication token is missing.');
    }

    if (
      !user.role.permissions.find(
        (permission: Permission) =>
          permission.descriptor === context.getClass().name &&
          permission.method ===
            context.switchToHttp().getRequest<Request>().method &&
          (permission.context === undefined ||
            permission.context === context.getHandler().name),
      )
    ) {
      throw new ForbiddenException('Not enough permissions.');
    }

    return user;
  }
}
