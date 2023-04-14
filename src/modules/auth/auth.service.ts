import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import * as cookie from 'cookie';

import { SessionService } from '../session/session.service';
import { UserResponse } from '../user/response/user.response';
import { UserService } from '../user/user.service';
import { UserRegistrationDto } from './dto/user-registration.dto';
import CookieWithRefreshToken from './interface/cookie-with-refresh-token.interface';
import RequestWithUser from './interface/request-with-user.interface';
import TokenPayload from './interface/token-payload.interface';
import { AccessTokenResponse } from './response/access-token.response';
import { UserLoginResponse } from './response/user-login.reponse';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
  ) {}

  public async verifyPassword(
    enteredPassword: string,
    password: string,
  ): Promise<void> {
    if (!(await bcrypt.compare(enteredPassword, password))) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<UserResponse> {
    try {
      const user = await this.userService.getUserByEmail(email);

      if (user === null) {
        throw new HttpException('User doesn`t exist', HttpStatus.BAD_REQUEST);
      }

      await this.verifyPassword(plainTextPassword, user.password);

      return user;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async registration(
    registrationDto: UserRegistrationDto,
  ): Promise<void> {
    await this.userService.create(registrationDto);
  }

  public async login(req: RequestWithUser): Promise<UserLoginResponse> {
    const accessToken = this.getAccessJwtToken(req.user.id);
    const user = await this.userService.getUserById(req.user.id);
    const { refreshTokenCookie, token: refreshToken } =
      this.getCookieWithJwtRefreshToken(req.user.id);

    await this.sessionService.createOrUpdateSessionByUserId(
      req.user.id,
      refreshToken,
    );

    if (user === null) {
      throw new HttpException('User doesn`t exist', HttpStatus.BAD_REQUEST);
    }

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
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return token;
  }

  public getCookieWithJwtRefreshToken(userId: string): CookieWithRefreshToken {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const refreshTokenCookie = cookie.serialize('refreshToken', token, {
      httpOnly: true,
      path: '/',
      maxAge: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
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
    if (refreshToken !== (await this.sessionService.getRefreshToken(userId))) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user = await this.userService.getUserById(userId);

    if (user === null) {
      throw new HttpException('User doesn`t exist', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  public async refresh(req: RequestWithUser): Promise<AccessTokenResponse> {
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
    return cookie.serialize('refreshToken', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });
  }
}
