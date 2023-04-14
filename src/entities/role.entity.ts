import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { SchemaTypes } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { swaggerType } from 'src/helpers/swagger/utils';
import { User } from '../modules/user/entities/user.entity';
import { Permission } from './permission.entity';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @ApiProperty()
  @Prop({ unique: true, index: true })
  id: string;

  @ApiProperty()
  @Prop({ unique: true })
  title: string;

  @ApiProperty(swaggerType(User))
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
  users: User[];

  @ApiProperty(swaggerType(Permission))
  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'Permission' }],
  })
  permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
