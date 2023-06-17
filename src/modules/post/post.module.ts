import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { Post, PostSchema } from './entities/post.entity';
import { User, UserSchema } from '../user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService],
})
export class PostModule {}
