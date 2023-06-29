import { ApiProperty } from '@nestjs/swagger';

import { swaggerType } from 'helpers/swagger/utils';
import { UserResponse } from 'modules/user/response/user.response';

export class UserLoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty(swaggerType(UserResponse))
  user: UserResponse;
}
