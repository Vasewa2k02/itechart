import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { COLLECTION_NAMES } from 'src/entities/enums/collection-names.enum';
import { MODEL_NAMES } from 'src/entities/enums/model-names.enum';
import { Post } from 'src/modules/post/entities/post.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Schema({ timestamps: true, collection: COLLECTION_NAMES.bookmarks })
export class Bookmark extends Document {
  @Prop({ unique: true, index: true })
  id: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: MODEL_NAMES.user })
  user: User;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: MODEL_NAMES.post })
  post: Post;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Boolean })
  isDeleted: boolean;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
