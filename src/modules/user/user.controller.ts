import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Role } from 'src/common/constants/role.enum';
import { AuthWithRoles } from 'src/common/decorators/auth-with-roles.decorator';

import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
import RequestWithUser from '../auth/interface/request-with-user.interface';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @AuthWithRoles(Role.User)
  @Get('profile')
  getUserInfo(@Req() req: RequestWithUser): Promise<IUser | null> {
    return this.userService.getUserByEmail(req.user.email);
  }
}
