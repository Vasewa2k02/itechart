import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Like } from './entities/like.entity';
import { ILike } from './interfaces/like.interface';
import { LIKE_FIELDS } from './types/like.type';
import { CreateLikeDto } from './dto/create-like.dto';
import { User } from '../user/entities/user.entity';
import { IUser } from '../user/interfaces/user.interface';
import { USER_FIELDS } from '../user/types/user.type';
import { Post } from '../post/entities/post.entity';
import { IPost } from '../post/interfaces/post.interface';
import { Comment } from '../comment/entities/comment.entity';
import { IComment } from '../comment/interfaces/comment.interface';
import { POST_FIELDS } from '../post/types/post.type';
import { COMMENT_FIELDS } from '../comment/types/comment.type';
import { LikeResponse } from './response/like.response';

@Injectable()
export class LikeRepository {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<ILike>,
    @InjectModel(Post.name) private postModel: Model<IPost>,
    @InjectModel(Comment.name) private commentModel: Model<IComment>,
    @InjectModel(User.name) private userModel: Model<IUser>,
  ) {}

  async findByLikedEntityId(likedEntityId: string): Promise<LikeResponse[]> {
    return await this.likeModel.find({
      [LIKE_FIELDS.likedEntity]: likedEntityId,
    });
  }

  async findAll(): Promise<LikeResponse[]> {
    return await this.likeModel.find({});
  }

  async findLikeById(id: string): Promise<ILike | null> {
    return await this.likeModel.findOne({ [LIKE_FIELDS.id]: id });
  }

  async create(
    id: string,
    authorId: string,
    createLikeDto: CreateLikeDto,
  ): Promise<void> {
    const { likedEntityId } = createLikeDto;
    const author = await this.userModel.findOne({
      [USER_FIELDS.id]: authorId,
    });

    const post = await this.postModel.findOne({
      [POST_FIELDS.id]: likedEntityId,
    });

    const comment = await this.commentModel.findOne({
      [COMMENT_FIELDS.id]: likedEntityId,
    });

    const likedEntity: Post | Comment | null = post || comment;

    if (!likedEntity) {
      throw new BadRequestException('Entity not found');
    }

    if (likedEntity?.isDeleted) {
      throw new BadRequestException('Entity deleted');
    }

    const like = await this.likeModel.findOne({
      [LIKE_FIELDS.author]: author,
      [LIKE_FIELDS.likedEntity]: likedEntity,
    });

    if (like) {
      throw new BadRequestException('Like already exists');
    }

    const createdLike = await this.likeModel.create({
      [LIKE_FIELDS.id]: id,
      [LIKE_FIELDS.author]: author,
      [LIKE_FIELDS.likedEntity]: likedEntity,
    });

    await author?.updateOne({ $push: { [USER_FIELDS.likes]: createdLike } });
    await likedEntity?.updateOne({ $push: { likes: createdLike } });
  }

  async delete(id: string): Promise<void> {
    const like = await this.findLikeById(id);

    await this.userModel.findOneAndUpdate(
      { [USER_FIELDS._id]: like?.author },
      { $pull: { [USER_FIELDS.likes]: like?._id } },
    );

    like?.deleteOne();
  }
}
