import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from 'modules/user/user.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SessionModule } from '../session/session.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtRefreshTokenStrategy, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({}),
    SessionModule,
  ],
})
export class AuthModule {}
