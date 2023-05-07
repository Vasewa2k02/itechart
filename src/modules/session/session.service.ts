import { ForbiddenException, Injectable } from '@nestjs/common';

import { SessionRepository } from './session.repository';

@Injectable()
export class SessionService {
  constructor(private sessionRepository: SessionRepository) {}

  async createOrUpdateSessionByUserId(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.sessionRepository.createOrUpdateSessionByUserId(
      userId,
      refreshToken,
    );
  }

  async getRefreshToken(userId: string): Promise<string> {
    const session = await this.sessionRepository.findSessionByUserId(userId);

    if (!session) {
      throw new ForbiddenException('Forbidden');
    }

    return session.refreshToken;
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await this.sessionRepository.removeRefreshToken(userId);
  }
}
