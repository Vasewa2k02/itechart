import {
  Body,
  Controller,
  Post,
  Req,
  Delete,
  Param,
  Get,
} from '@nestjs/common';

import { Role } from 'src/common/constants/role.enum';

import { BookmarkService } from './bookmark.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { BookmarkResponse } from './response/bookmark.response';
import { AuthWithRoles } from 'src/common/decorators/auth-with-roles.decorator';

@ApiTags('bookmark')
@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get('post/:postId')
  findByPostId(@Param('postId') postId: string): Promise<BookmarkResponse[]> {
    return this.bookmarkService.findByPostId(postId);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Promise<BookmarkResponse[]> {
    return this.bookmarkService.findByUserId(userId);
  }

  @ApiBearerAuth()
  @AuthWithRoles(Role.User)
  @Get('all')
  findAll(): Promise<BookmarkResponse[]> {
    return this.bookmarkService.findAll();
  }

  @ApiBearerAuth()
  @AuthWithRoles(Role.User)
  @Post()
  create(
    @Req() requestWithUser: RequestWithUser,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ): Promise<void> {
    return this.bookmarkService.create(
      requestWithUser.user.id,
      createBookmarkDto,
    );
  }

  @ApiBearerAuth()
  @AuthWithRoles(Role.User)
  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() requestWithUser: RequestWithUser,
  ): Promise<void> {
    return this.bookmarkService.delete(id, requestWithUser.user._id.toString());
  }
}
