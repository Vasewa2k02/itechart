import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponse } from './response/post.response';
import { IPost } from './interfaces/post.interface';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async findNotDeleted(): Promise<PostResponse[]> {
    return await this.postRepository.findNotDeleted();
  }

  async findAll(): Promise<PostResponse[]> {
    return await this.postRepository.findAll();
  }

  async create(authorId: string, createPostDto: CreatePostDto): Promise<void> {
    await this.postRepository.create(v4(), authorId, createPostDto);
  }

  async update(
    id: string,
    authorObjectId: string,
    updatePostDto: UpdatePostDto,
  ): Promise<void> {
    const post = await this.postRepository.findPostById(id);

    this.checkPostExistence(post);
    this.checkPostOwner(post, authorObjectId);

    await this.postRepository.update(id, updatePostDto);
  }

  async delete(id: string, authorObjectId: string): Promise<void> {
    const post = await this.postRepository.findPostById(id);

    this.checkPostExistence(post);
    this.checkPostOwner(post, authorObjectId);

    await this.postRepository.delete(id);
  }

  checkPostExistence(post: IPost | null): void {
    if (!post) {
      throw new BadRequestException('Post not found');
    }

    if (post.isDeleted) {
      throw new BadRequestException('Post deleted');
    }
  }

  checkPostOwner(post: IPost | null, authorObjectId: string): void {
    if (post?.author.toString() !== authorObjectId) {
      throw new BadRequestException('This post doesn`t belong to you');
    }
  }
}
