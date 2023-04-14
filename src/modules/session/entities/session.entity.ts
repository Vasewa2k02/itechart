import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
  @ApiProperty()
  @Prop({ type: String, ref: 'User', unique: true, index: true })
  userId: string;

  @ApiProperty()
  @Prop({ required: true })
  refreshToken: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
