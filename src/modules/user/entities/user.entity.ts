import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { COLLECTION_NAMES } from 'entities/enums/collection-names.enum';
import { MODEL_NAMES } from 'entities/enums/model-names.enum';
import { Role } from 'entities/role.entity';
import { Bookmark } from 'modules/bookmark/entities/bookmark.entity';
import { Like } from 'modules/like/entities/like.entity';
import { Post } from 'modules/post/entities/post.entity';

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

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL_NAMES.post }] })
  posts: Post[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL_NAMES.comment }] })
  comments: Comment[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL_NAMES.like }] })
  likes: Like[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL_NAMES.bookmark }] })
  bookmarks: Bookmark[];
}

export const UserSchema = SchemaFactory.createForClass(User);
