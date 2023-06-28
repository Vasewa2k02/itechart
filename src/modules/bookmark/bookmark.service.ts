import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 } from 'uuid';

import { BookmarkRepository } from './bookmark.repository';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { PostService } from '../post/post.service';
import { PostRepository } from '../post/post.repository';
import { IBookmark } from './interfaces/bookmark.interface';
import { BookmarkResponse } from './response/bookmark.response';

@Injectable()
export class BookmarkService {
  constructor(
    private bookmarkRepository: BookmarkRepository,
    private postService: PostService,
    private postRepository: PostRepository,
  ) {}

  async findByPostId(postId: string): Promise<BookmarkResponse[]> {
    return await this.bookmarkRepository.findByPostId(postId);
  }

  async findByUserId(userId: string): Promise<BookmarkResponse[]> {
    return await this.bookmarkRepository.findByUserId(userId);
  }

  async findAll(): Promise<BookmarkResponse[]> {
    return await this.bookmarkRepository.findAll();
  }

  async create(
    userId: string,
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<void> {
    const { postId } = createBookmarkDto;
    const post = await this.postRepository.findPostById(postId);
    this.postService.checkPostExistence(post);

    const bookmark =
      await this.bookmarkRepository.findBookmarkByUserIdAndPostId(
        userId,
        postId,
      );

    if (bookmark) {
      throw new BadRequestException('Bookmark alredy exists');
    }

    await this.bookmarkRepository.create(v4(), userId, createBookmarkDto);
  }

  async delete(id: string, authorObjectId: string): Promise<void> {
    const bookmark = await this.bookmarkRepository.findBookmarkById(id);

    this.checkBookmarkExistence(bookmark);
    this.checkBookmarkOwner(bookmark, authorObjectId);

    await this.bookmarkRepository.delete(id);
  }

  checkBookmarkExistence(bookmark: IBookmark | null): void {
    if (!bookmark) {
      throw new BadRequestException('Bookmark not found');
    }

    if (bookmark.isDeleted) {
      throw new BadRequestException('Bookmark deleted');
    }
  }

  checkBookmarkOwner(bookmark: IBookmark | null, authorObjectId: string): void {
    if (bookmark?.user.toString() !== authorObjectId) {
      throw new BadRequestException('This bookmark doesn`t belong to you');
    }
  }
}
