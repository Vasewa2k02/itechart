import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Req,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponse } from './response/post.response';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findNotDeleted(): Promise<PostResponse[]> {
    return this.postService.findNotDeleted();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll(): Promise<PostResponse[]> {
    return this.postService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() requestWithUser: RequestWithUser,
    @Body() createPostDto: CreatePostDto,
  ): Promise<void> {
    return this.postService.create(requestWithUser.user.id, createPostDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() requestWithUser: RequestWithUser,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<void> {
    return this.postService.update(
      id,
      requestWithUser.user._id.toString(),
      updatePostDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() requestWithUser: RequestWithUser,
  ): Promise<void> {
    return this.postService.delete(id, requestWithUser.user._id.toString());
  }
}
