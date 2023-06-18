import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { User } from 'src/modules/user/entities/user.entity';
import { COLLECTION_NAMES } from 'src/entities/enums/collection-names.enum';
import { MODEL_NAMES } from 'src/entities/enums/model-names.enum';
import { Like } from 'src/modules/like/entities/like.entity';
import { Post } from 'src/modules/post/entities/post.entity';

@Schema({ timestamps: true, collection: COLLECTION_NAMES.comments })
export class Comment extends Document {
  @Prop({ unique: true, index: true })
  id: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: MODEL_NAMES.user })
  author: User;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: MODEL_NAMES.post })
  post: Post;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL_NAMES.like }] })
  likes: Like[];

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Boolean })
  isDeleted: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
