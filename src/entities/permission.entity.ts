import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { HTTPMethods } from './enums/http-methods.enum';
import { Role } from './role.entity';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission {
  @Prop({ unique: true, index: true })
  id: string;

  @Prop({ required: true })
  descriptor: string;

  @Prop()
  context: string;

  @Prop({ required: true, enum: HTTPMethods })
  method: HTTPMethods;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Role' })
  role: Role;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
