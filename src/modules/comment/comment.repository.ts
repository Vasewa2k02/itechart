import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { IComment } from './interfaces/comment.interface';
import { COMMENT_FIELDS } from './types/comment.type';
import { Post } from '../post/entities/post.entity';
import { IPost } from '../post/interfaces/post.interface';
import { POST_FIELDS } from '../post/types/post.type';
import { User } from '../user/entities/user.entity';
import { IUser } from '../user/interfaces/user.interface';
import { USER_FIELDS } from '../user/types/user.type';
import { CommentResponse } from './response/comment.response';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<IComment>,
    @InjectModel(Post.name) private postModel: Model<IPost>,
    @InjectModel(User.name) private userModel: Model<IUser>,
  ) {}

  async findNotDeletedByPostId(postId: string): Promise<CommentResponse[]> {
    const post = await this.postModel.findOne({ [POST_FIELDS.id]: postId });

    return await this.commentModel.find({
      [COMMENT_FIELDS.post]: post,
      [COMMENT_FIELDS.isDeleted]: { $ne: true },
    });
  }

  async findByPostId(postId: string): Promise<CommentResponse[]> {
    const post = await this.postModel.findOne({ [POST_FIELDS.id]: postId });

    return await this.commentModel.find({
      [COMMENT_FIELDS.post]: post,
    });
  }

  async findAll(): Promise<CommentResponse[]> {
    return await this.commentModel.find();
  }

  async findCommentById(id: string): Promise<IComment | null> {
    return await this.commentModel.findOne({ [COMMENT_FIELDS.id]: id });
  }

  async create(
    id: string,
    postId: string,
    authorId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<void> {
    const post = await this.postModel.findOne({
      [POST_FIELDS.id]: postId,
    });

    const author = await this.userModel.findOne({
      [USER_FIELDS.id]: authorId,
    });

    const comment = await this.commentModel.create({
      [COMMENT_FIELDS.id]: id,
      [COMMENT_FIELDS.author]: author,
      [COMMENT_FIELDS.post]: post,
      ...createCommentDto,
    });

    await author?.updateOne({ $push: { [USER_FIELDS.comments]: comment } });
    await post?.updateOne({ $push: { [POST_FIELDS.comments]: comment } });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<void> {
    await this.commentModel.findOneAndUpdate(
      {
        [POST_FIELDS.id]: id,
      },
      { ...updateCommentDto },
    );
  }

  async delete(id: string): Promise<void> {
    await this.commentModel.findOneAndUpdate(
      {
        [POST_FIELDS.id]: id,
      },
      { [POST_FIELDS.isDeleted]: true },
    );
  }
}
