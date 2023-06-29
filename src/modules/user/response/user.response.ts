import { ApiProperty } from '@nestjs/swagger';

import { User } from 'modules/user/entities/user.entity';
import { Role } from 'entities/role.entity';
import { swaggerType } from 'helpers/swagger/utils';

export class UserResponse implements Pick<User, 'id' | 'email' | 'role'> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty(swaggerType(Role))
  role: Role;
}
