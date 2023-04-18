import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ISession } from './interfaces/session.interface';
import { Session } from './entities/session.entity';
import { User } from '../user/entities/user.entity';
import { IUser } from '../user/interfaces/user.interface';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<ISession>,
    @InjectModel(User.name) private userModel: Model<IUser>,
  ) {}

  public async createOrUpdateSessionByUserId(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.sessionModel.findOneAndUpdate(
      { user: await this.userModel.findOne({ id: userId }) },
      { refreshToken },
      { upsert: true },
    );
  }

  public async findSessionByUserId(userId: string): Promise<ISession> {
    const session = await this.sessionModel.findOne({
      user: await this.userModel.findOne({ id: userId }),
    });

    if (session === null) {
      throw new BadRequestException('User doesn`t exist');
    }

    return session;
  }

  public async removeRefreshToken(userId: string): Promise<void> {
    await this.sessionModel.deleteOne({
      user: await this.userModel.findOne({ id: userId }),
    });
  }
}
