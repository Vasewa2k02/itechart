import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostService } from '../post/post.service';
import { PostRepository } from '../post/post.repository';
import { CommentResponse } from './response/comment.response';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { IComment } from './interfaces/comment.interface';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private postService: PostService,
    private postRepository: PostRepository,
  ) {}

  async findNotDeletedByPostId(postId: string): Promise<CommentResponse[]> {
    return await this.commentRepository.findNotDeletedByPostId(postId);
  }

  async findByPostId(postId: string): Promise<CommentResponse[]> {
    return await this.commentRepository.findByPostId(postId);
  }

  async findAll(): Promise<CommentResponse[]> {
    return await this.commentRepository.findAll();
  }

  async create(
    postId: string,
    authorId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<void> {
    const post = await this.postRepository.findPostById(postId);

    await this.postService.checkPostExistence(post);
    await this.commentRepository.create(
      v4(),
      postId,
      authorId,
      createCommentDto,
    );
  }

  async update(
    id: string,
    authorObjectId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<void> {
    const comment = await this.commentRepository.findCommentById(id);

    await this.checkCommentExistence(comment);
    await this.checkCommentOwner(comment, authorObjectId);
    await this.commentRepository.update(id, updateCommentDto);
  }

  async delete(id: string, authorObjectId: string): Promise<void> {
    const comment = await this.commentRepository.findCommentById(id);

    await this.checkCommentExistence(comment);
    await this.checkCommentOwner(comment, authorObjectId);
    await this.commentRepository.delete(id);
  }

  async checkCommentExistence(comment: IComment | null): Promise<void> {
    if (!comment) {
      throw new BadRequestException('Comment not found');
    }

    if (comment.isDeleted) {
      throw new BadRequestException('Comment deleted');
    }
  }

  async checkCommentOwner(
    comment: IComment | null,
    authorObjectId: string,
  ): Promise<void> {
    if (comment?.author.toString() !== authorObjectId) {
      throw new BadRequestException('This comment doesn`t belong to you');
    }
  }
}
