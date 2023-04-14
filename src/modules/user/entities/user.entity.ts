import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Role } from 'src/entities/role.entity';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: true, index: true })
  id: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Role' })
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
}

export const UserSchema = SchemaFactory.createForClass(User);
