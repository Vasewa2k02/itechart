import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-with-user.interface';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserInfo(@Req() req: RequestWithUser): Promise<IUser | null> {
    return this.userService.getUserByEmail(req.user.email);
  }
}
