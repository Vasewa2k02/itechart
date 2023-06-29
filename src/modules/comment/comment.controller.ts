import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Req,
  Body,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthWithRoles } from 'common/decorators/auth-with-roles.decorator';
import { Role } from 'common/constants/role.enum';

import { CommentService } from './comment.service';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponse } from './response/comment.response';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('not-deleted-for-post/:postId')
  findNotDeletedByPostId(
    @Param('postId') postId: string,
  ): Promise<CommentResponse[]> {
    return this.commentService.findNotDeletedByPostId(postId);
  }

  @ApiBearerAuth()
  @AuthWithRoles(Role.user)
  @Get('all-for-post/:postId')
  findByPostId(@Param('postId') postId: string): Promise<CommentResponse[]> {
    return this.commentService.findByPostId(postId);
  }

  @ApiBearerAuth()
  @AuthWithRoles(Role.user)
  @Get('all')
  findAll(): Promise<CommentResponse[]> {
    return this.commentService.findAll();
  }

  @ApiBearerAuth()
  @AuthWithRoles(Role.user)
  @Post(':postId')
  create(
    @Param('postId') postId: string,
    @Req() requestWithUser: RequestWithUser,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<void> {
    return this.commentService.create(
      postId,
      requestWithUser.user.id,
      createCommentDto,
    );
  }

  @ApiBearerAuth()
  @AuthWithRoles(Role.user)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() requestWithUser: RequestWithUser,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<void> {
    return this.commentService.update(
      id,
      requestWithUser.user._id.toString(),
      updateCommentDto,
    );
  }

  @ApiBearerAuth()
  @AuthWithRoles(Role.user)
  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() requestWithUser: RequestWithUser,
  ): Promise<void> {
    return this.commentService.delete(id, requestWithUser.user._id.toString());
  }
}
