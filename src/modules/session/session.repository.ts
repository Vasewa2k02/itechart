import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISession } from './interfaces/session.interface';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectModel('Session') private readonly sessionModel: Model<ISession>,
  ) {}

  public async createOrUpdateSessionByUserId(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.sessionModel.findOneAndUpdate(
      { userId },
      { refreshToken },
      { upsert: true },
    );
  }

  public async findSessionByUserId(userId: string): Promise<ISession> {
    const session = await this.sessionModel.findOne({ userId });

    if (session === null) {
      throw new HttpException('User doesn`t exist', HttpStatus.BAD_REQUEST);
    }

    return session;
  }

  public async removeRefreshToken(userId: string): Promise<void> {
    await this.sessionModel.deleteOne({
      userId,
    });
  }
}
