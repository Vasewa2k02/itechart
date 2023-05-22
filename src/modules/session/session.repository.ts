import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ISession } from './interfaces/session.interface';
import { Session } from './entities/session.entity';
import { User } from '../user/entities/user.entity';
import { IUser } from '../user/interfaces/user.interface';
import { USER_FIELDS } from '../user/types/user.type';
import { SESSION_FIELDS } from './types/session.type';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<ISession>,
    @InjectModel(User.name) private userModel: Model<IUser>,
  ) {}

  async createOrUpdateSessionByUserId(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const user = await this.userModel.findOne({
      [USER_FIELDS.id]: userId,
    });

    await this.sessionModel.findOneAndUpdate(
      {
        [SESSION_FIELDS.user]: user,
      },
      { [SESSION_FIELDS.refreshToken]: refreshToken },
      { upsert: true },
    );
  }

  async findSessionByUserId(userId: string): Promise<ISession> {
    const session = await this.sessionModel.findOne({
      [SESSION_FIELDS.user]: await this.userModel.findOne({
        [USER_FIELDS.id]: userId,
      }),
    });

    if (session === null) {
      throw new BadRequestException('User doesn`t exist');
    }

    return session;
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await this.sessionModel.deleteOne({
      [SESSION_FIELDS.user]: await this.userModel.findOne({
        [USER_FIELDS.id]: userId,
      }),
    });
  }
}
