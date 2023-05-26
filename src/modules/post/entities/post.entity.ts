import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { COLLECTION_NAMES } from 'src/entities/enums/collection-names.enum';
import { MODEL_NAMES } from 'src/entities/enums/model-names.enum';
import { Bookmark } from 'src/modules/bookmark/entities/bookmark.entity';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { Like } from 'src/modules/like/entities/like.entity';

@Schema({ timestamps: true, collection: COLLECTION_NAMES.posts })
export class Post extends Document {
  @Prop({ unique: true, index: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  pathToMediaFile: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL_NAMES.like }] })
  likes: Like[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL_NAMES.bookmark }] })
  bookmarks: Bookmark[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: MODEL_NAMES.comment }] })
  comments: Comment[];

  @Prop({ type: Date })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
