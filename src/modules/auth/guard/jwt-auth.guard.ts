import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Permission } from 'src/entities/permission.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor() {
    super();
  }

  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  public handleRequest(
    error: Error,
    user: any,
    info: string,
    context: ExecutionContext,
  ): any {
    if (!user) {
      throw new HttpException(
        'Authentication token is missing.',
        HttpStatus.FORBIDDEN,
      );
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
      throw new HttpException('Not enough permissions.', HttpStatus.FORBIDDEN);
    }

    return user;
  }
}
