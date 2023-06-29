import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Req,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthWithRoles } from 'common/decorators/auth-with-roles.decorator';
import { Role } from 'common/constants/role.enum';

import { LikeService } from './like.service';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeResponse } from './response/like.response';

@ApiTags('like')
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
  @AuthWithRoles(Role.user)
  @Post()
  create(
    @Req() requestWithUser: RequestWithUser,
    @Body() createLikeDto: CreateLikeDto,
  ): Promise<void> {
    return this.likeService.create(requestWithUser.user.id, createLikeDto);
  }

  @ApiBearerAuth()
  @AuthWithRoles(Role.user)
  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() requestWithUser: RequestWithUser,
  ): Promise<void> {
    return this.likeService.delete(id, requestWithUser.user._id.toString());
  }
}
