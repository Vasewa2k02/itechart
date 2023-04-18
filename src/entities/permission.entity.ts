import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { SchemaTypes, HydratedDocument } from 'mongoose';

import { Role } from './role.entity';
import { HTTPMethod } from './enums/http-method.enum';
import { COLLECTION_NAMES } from './enums/collection-names.enum';
import { MODEL_NAMES } from './enums/model-names.enum';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ collection: COLLECTION_NAMES.permissions })
export class Permission {
  @Prop({ unique: true, index: true })
  id: string;

  @Prop({ required: true })
  descriptor: string;

  @Prop()
  context: string;

  @Prop({ required: true, enum: HTTPMethod })
  method: HTTPMethod;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: MODEL_NAMES.role })
  role: Role;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
