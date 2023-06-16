import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { COLLECTION_NAMES } from 'src/entities/enums/collection-names.enum';
import { MODEL_NAMES } from 'src/entities/enums/model-names.enum';
import { Role } from 'src/entities/role.entity';

@Schema({ timestamps: true, collection: COLLECTION_NAMES.users })
export class User extends Document {
  @Prop({ unique: true, index: true })
  id: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: MODEL_NAMES.role })
  role: Role;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Boolean })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
