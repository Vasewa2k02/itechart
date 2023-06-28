import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, SchemaTypes } from 'mongoose';

import { COLLECTION_NAMES } from 'src/entities/enums/collection-names.enum';
import { MODEL_NAMES } from 'src/entities/enums/model-names.enum';
import { User } from 'src/modules/user/entities/user.entity';

export type SessionDocument = HydratedDocument<Session>;

@Schema({ collection: COLLECTION_NAMES.sessions })
export class Session {
  @ApiProperty()
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: MODEL_NAMES.user,
    unique: true,
  })
  user: User;

  @ApiProperty()
  @Prop({ required: true })
  refreshToken: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
