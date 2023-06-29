import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { BookmarkRepository } from './bookmark.repository';
import { Bookmark, BookmarkSchema } from './entities/bookmark.entity';
import { User, UserSchema } from '../user/entities/user.entity';
import { Post, PostSchema } from '../post/entities/post.entity';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bookmark.name, schema: BookmarkSchema },
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
    PostModule,
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService, BookmarkRepository],
  exports: [BookmarkService],
})
export class BookmarkModule {}
