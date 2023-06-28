import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { BookmarkResponse } from './response/bookmark.response';

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
  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll(): Promise<BookmarkResponse[]> {
    return this.bookmarkService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() requestWithUser: RequestWithUser,
  ): Promise<void> {
    return this.bookmarkService.delete(id, requestWithUser.user._id.toString());
  }
}
