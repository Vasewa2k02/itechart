import {
  Controller,
  UseGuards,
  Get,
  Post,
  Delete,
  Body,
  Req,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { LikeService } from './like.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeResponse } from './response/like.response';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get('liked-entity/:likedEntityId')
  findByPostId(
    @Param('likedEntityId') likedEntityId: string,
  ): Promise<LikeResponse[]> {
    return this.likeService.findByLikedEntityId(likedEntityId);
  }

  @Get('all')
  findAll(): Promise<LikeResponse[]> {
    return this.likeService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() requestWithUser: RequestWithUser,
    @Body() createLikeDto: CreateLikeDto,
  ): Promise<void> {
    return this.likeService.create(requestWithUser.user.id, createLikeDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() requestWithUser: RequestWithUser,
  ): Promise<void> {
    return this.likeService.delete(id, requestWithUser.user._id.toString());
  }
}
