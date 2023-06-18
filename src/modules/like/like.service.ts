import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { LikeRepository } from './like.repository';
import { CreateLikeDto } from './dto/create-like.dto';
import { ILike } from './interfaces/like.interface';
import { LikeResponse } from './response/like.response';

@Injectable()
export class LikeService {
  constructor(private likeRepository: LikeRepository) {}

  async findByLikedEntityId(likedEntityId: string): Promise<LikeResponse[]> {
    return await this.likeRepository.findByLikedEntityId(likedEntityId);
  }

  async findAll(): Promise<LikeResponse[]> {
    return await this.likeRepository.findAll();
  }

  async create(authorId: string, createLikeDto: CreateLikeDto): Promise<void> {
    await this.likeRepository.create(v4(), authorId, createLikeDto);
  }

  async delete(id: string, authorObjectId: string): Promise<void> {
    const like = await this.likeRepository.findLikeById(id);

    await this.checkLikeExistence(like);
    await this.checkPostOwner(like, authorObjectId);
    await this.likeRepository.delete(id);
  }

  async checkLikeExistence(like: ILike | null): Promise<void> {
    if (!like) {
      throw new BadRequestException('Post not found');
    }
  }

  async checkPostOwner(
    like: ILike | null,
    authorObjectId: string,
  ): Promise<void> {
    if (like?.author.toString() !== authorObjectId) {
      throw new BadRequestException('This like doesn`t belong to you');
    }
  }
}
