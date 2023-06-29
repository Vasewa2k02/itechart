import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { COLLECTION_NAMES } from 'entities/enums/collection-names.enum';
import { MODEL_NAMES } from 'entities/enums/model-names.enum';
import { User } from 'modules/user/entities/user.entity';
import { Post } from 'modules/post/entities/post.entity';
import { Comment } from 'modules/comment/entities/comment.entity';

@Schema({ timestamps: true, collection: COLLECTION_NAMES.likes })
export class Like extends Document {
  @Prop({ unique: true, index: true })
  id: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: MODEL_NAMES.user })
  author: User;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: MODEL_NAMES.post || MODEL_NAMES.comment,
  })
  likedEntity: Post | Comment;

  @Prop({ type: Date })
  createdAt: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
