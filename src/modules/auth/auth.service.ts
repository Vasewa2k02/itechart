import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as cookie from 'cookie';

import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_COOKIE,
} from 'src/common/consts';

import { UserRegistrationDto } from './dto/user-registration.dto';
import CookieWithRefreshToken from './interface/cookie-with-refresh-token.interface';
import RequestWithUser from './interface/request-with-user.interface';
import TokenPayload from './interface/token-payload.interface';
import { AccessTokenResponse } from './response/access-token.response';
import { UserLoginResponse } from './response/user-login.reponse';
import { SessionService } from '../session/session.service';
import { UserResponse } from '../user/response/user.response';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private sessionService: SessionService,
    private configService: ConfigService,
  ) {}

  public async verifyPassword(
    enteredPassword: string,
    password: string,
  ): Promise<void> {
    const isPasswordVerified = await bcrypt.compare(enteredPassword, password);

    if (!isPasswordVerified) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  public async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<UserResponse> {
    try {
      const user = await this.userService.getUserByEmail(email);

      if (user === null) {
        throw new BadRequestException('User doesn`t exist');
      }

      await this.verifyPassword(plainTextPassword, user.password);

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async register(registrationDto: UserRegistrationDto): Promise<void> {
    await this.userService.create(registrationDto);
  }

  public async login(req: RequestWithUser): Promise<UserLoginResponse> {
    const user = await this.userService.getUserById(req.user.id);

    if (user === null) {
      throw new BadRequestException('User doesn`t exist');
    }

    const accessToken = this.getAccessJwtToken(req.user.id);
    const { refreshTokenCookie, token: refreshToken } =
      this.getCookieWithJwtRefreshToken(req.user.id);

    await this.sessionService.createOrUpdateSessionByUserId(
      req.user.id,
      refreshToken,
    );

    req.res?.setHeader('Set-Cookie', refreshTokenCookie);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  public getAccessJwtToken(userId: string): string {
    const payload: TokenPayload = { userId };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get(JWT_ACCESS_TOKEN_SECRET),
      expiresIn: `${this.configService.get(JWT_ACCESS_TOKEN_EXPIRATION_TIME)}s`,
    });

    return token;
  }

  public getCookieWithJwtRefreshToken(userId: string): CookieWithRefreshToken {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get(JWT_REFRESH_TOKEN_SECRET),
      expiresIn: `${this.configService.get(
        JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      )}s`,
    });
    const refreshTokenCookie = cookie.serialize(REFRESH_TOKEN_COOKIE, token, {
      httpOnly: true,
      path: '/',
      maxAge: this.configService.get(JWT_REFRESH_TOKEN_EXPIRATION_TIME),
    });

    return {
      refreshTokenCookie,
      token,
    };
  }

  public async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: string,
  ): Promise<UserResponse> {
    const refreshTokenFromDB = await this.sessionService.getRefreshToken(
      userId,
    );

    if (refreshToken !== refreshTokenFromDB) {
      throw new ForbiddenException('Forbidden');
    }

    const user = await this.userService.getUserById(userId);

    if (user === null) {
      throw new BadRequestException('User doesn`t exist');
    }

    return user;
  }

  public async refresh(req: RequestWithUser): Promise<AccessTokenResponse> {
    console.log(req.user);

    const accessToken = this.getAccessJwtToken(req.user.id);

    const { refreshTokenCookie, token: refreshToken } =
      this.getCookieWithJwtRefreshToken(req.user.id);

    await this.sessionService.createOrUpdateSessionByUserId(
      req.user.id,
      refreshToken,
    );

    req.res?.setHeader('Set-Cookie', refreshTokenCookie);

    return { accessToken };
  }

  public async removeRefreshToken(req: RequestWithUser): Promise<void> {
    await this.sessionService.removeRefreshToken(req.user.id);
    req.res?.setHeader('Set-Cookie', this.getCookieForLogout());
  }

  private getCookieForLogout(): string {
    return cookie.serialize(REFRESH_TOKEN_COOKIE, '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });
  }
}
