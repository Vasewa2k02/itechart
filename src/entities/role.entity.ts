import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { swaggerType } from 'src/helpers/swagger/utils';

import { User } from '../modules/user/entities/user.entity';
import { COLLECTION_NAMES } from './enums/collection-names.enum';
import { MODEL_NAMES } from './enums/model-names.enum';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ collection: COLLECTION_NAMES.roles })
export class Role {
  @ApiProperty()
  @Prop({ unique: true, index: true })
  id: string;

  @ApiProperty()
  @Prop({ unique: true })
  title: string;

  @ApiProperty(swaggerType(User))
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL_NAMES.user }] })
  users: User[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
