import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { swaggerType } from 'src/helpers/swagger/utils';

import RequestWithUser from './interface/request-with-user.interface';
import { AuthService } from './auth.service';
import { UserRegistrationDto } from './dto/user-registration.dto';
import JwtRefreshGuard from './guard/jwt-refresh.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AccessTokenResponse } from './response/access-token.response';
import { UserLoginResponse } from './response/user-login.reponse';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse()
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  register(@Body() registrationDto: UserRegistrationDto): Promise<void> {
    return this.authService.register(registrationDto);
  }

  @ApiOkResponse(swaggerType(UserLoginResponse))
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  login(@Req() req: RequestWithUser): Promise<UserLoginResponse> {
    return this.authService.login(req);
  }

  @ApiOkResponse(swaggerType(AccessTokenResponse))
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@Req() req: RequestWithUser): Promise<AccessTokenResponse> {
    return this.authService.refresh(req);
  }
}
