import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from '../post/entities/post.entity';
import { IPost } from '../post/interfaces/post.interface';
import { POST_FIELDS } from '../post/types/post.type';
import { User } from '../user/entities/user.entity';
import { IUser } from '../user/interfaces/user.interface';
import { USER_FIELDS } from '../user/types/user.type';
import { IBookmark } from './interfaces/bookmark.interface';
import { Bookmark } from './entities/bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { BOOKMARK_FIELDS } from './types/bookmark.type';
import { use } from 'passport';
import { BookmarkResponse } from './response/bookmark.response';

@Injectable()
export class BookmarkRepository {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<IBookmark>,
    @InjectModel(Post.name) private postModel: Model<IPost>,
    @InjectModel(User.name) private userModel: Model<IUser>,
  ) {}

  async findByPostId(postId: string): Promise<BookmarkResponse[]> {
    const post = await this.postModel.findOne({ [POST_FIELDS.id]: postId });

    return await this.bookmarkModel.find({
      [BOOKMARK_FIELDS.post]: post,
      [BOOKMARK_FIELDS.isDeleted]: { $ne: true },
    });
  }

  async findByUserId(userId: string): Promise<BookmarkResponse[]> {
    const user = await this.userModel.findOne({
      [USER_FIELDS.id]: userId,
    });

    return await this.bookmarkModel.find({
      [BOOKMARK_FIELDS.user]: user,
      [BOOKMARK_FIELDS.isDeleted]: { $ne: true },
    });
  }

  async findAll(): Promise<BookmarkResponse[]> {
    return await this.bookmarkModel.find();
  }

  async findBookmarkById(id: string): Promise<IBookmark | null> {
    return await this.bookmarkModel.findOne({ [BOOKMARK_FIELDS.id]: id });
  }

  async findBookmarkByUserIdAndPostId(
    userId: string,
    postId: string,
  ): Promise<IBookmark | null> {
    const user = await this.userModel.findOne({ [USER_FIELDS.id]: userId });
    const post = await this.postModel.findOne({ [POST_FIELDS.id]: postId });

    return await this.bookmarkModel.findOne({
      [BOOKMARK_FIELDS.user]: user,
      [BOOKMARK_FIELDS.post]: post,
    });
  }

  async create(
    id: string,
    userId: string,
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<void> {
    const { postId } = createBookmarkDto;
    const post = await this.postModel.findOne({
      [POST_FIELDS.id]: postId,
    });

    const user = await this.userModel.findOne({
      [USER_FIELDS.id]: userId,
    });

    const bookmark = await this.bookmarkModel.create({
      [BOOKMARK_FIELDS.id]: id,
      [BOOKMARK_FIELDS.user]: user,
      [BOOKMARK_FIELDS.post]: post,
    });

    await user?.updateOne({ $push: { [USER_FIELDS.bookmarks]: bookmark } });
    await post?.updateOne({ $push: { [POST_FIELDS.bookmarks]: bookmark } });
  }

  async delete(id: string): Promise<void> {
    await this.bookmarkModel.findOneAndUpdate(
      {
        [POST_FIELDS.id]: id,
      },
      { [POST_FIELDS.isDeleted]: true },
    );
  }
}
