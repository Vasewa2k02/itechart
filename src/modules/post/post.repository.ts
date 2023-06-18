import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { IPost } from './interfaces/post.interface';
import { POST_FIELDS } from './types/post.type';
import { User } from '../user/entities/user.entity';
import { IUser } from '../user/interfaces/user.interface';
import { USER_FIELDS } from '../user/types/user.type';
import { PostResponse } from './response/post.response';

@Injectable()
export class PostRepository {
  constructor(
    @InjectModel(Post.name) private postModel: Model<IPost>,
    @InjectModel(User.name) private userModel: Model<IUser>,
  ) {}

  async findNotDeleted(): Promise<PostResponse[]> {
    return await this.postModel.find({
      [POST_FIELDS.isDeleted]: { $ne: true },
    });
  }

  async findAll(): Promise<PostResponse[]> {
    return await this.postModel.find().populate('comments');
  }

  async findPostById(id: string): Promise<IPost | null> {
    return await this.postModel.findOne({ [POST_FIELDS.id]: id });
  }

  async create(
    id: string,
    authorId: string,
    сreatePostDto: CreatePostDto,
  ): Promise<void> {
    const author = await this.userModel.findOne({
      [USER_FIELDS.id]: authorId,
    });

    const post = await this.postModel.create({
      [POST_FIELDS.id]: id,
      [POST_FIELDS.author]: author,
      ...сreatePostDto,
    });

    await author?.updateOne({ $push: { [USER_FIELDS.posts]: post } });
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<void> {
    await this.postModel.findOneAndUpdate(
      {
        [POST_FIELDS.id]: id,
      },
      { ...updatePostDto },
    );
  }

  async delete(id: string): Promise<void> {
    await this.postModel.findOneAndUpdate(
      {
        [POST_FIELDS.id]: id,
      },
      { [POST_FIELDS.isDeleted]: true },
    );
  }
}
