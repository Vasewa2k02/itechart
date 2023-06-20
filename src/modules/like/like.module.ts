import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { Like, LikeSchema } from './entities/like.entity';
import { LikeRepository } from './like.repository';
import { User, UserSchema } from '../user/entities/user.entity';
import { Comment, CommentSchema } from '../comment/entities/comment.entity';
import { Post, PostSchema } from '../post/entities/post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: User.name, schema: UserSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
  exports: [LikeService],
})
export class LikeModule {}
