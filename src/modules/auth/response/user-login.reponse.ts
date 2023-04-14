import { ApiProperty } from '@nestjs/swagger';
import { swaggerType } from 'src/helpers/swagger/utils';
import { UserResponse } from '../../user/response/user.response';

export class UserLoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty(swaggerType(UserResponse))
  user: UserResponse;
}
