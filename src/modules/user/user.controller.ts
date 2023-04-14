import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public registration(@Req() req: RequestWithUser): Promise<IUser | null> {
    return this.userService.getUserByEmail(req.user.email);
  }
}
