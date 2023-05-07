import { Document } from 'mongoose';

import { User } from 'src/modules/user/entities/user.entity';

export interface ISession extends Document {
  user: User;
  refreshToken: string;
}
