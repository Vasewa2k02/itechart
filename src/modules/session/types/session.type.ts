import { EntityFields } from 'common/types';

import { Session } from '../entities/session.entity';

type SessionEntity = Pick<Session, 'refreshToken' | 'user'>;

export const SESSION_FIELDS: EntityFields<SessionEntity> = {
  refreshToken: 'refreshToken',
  user: 'user',
};
