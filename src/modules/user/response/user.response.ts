import { ApiProperty } from '@nestjs/swagger';

import { User } from 'src/modules/user/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { swaggerType } from 'src/helpers/swagger/utils';

export class UserResponse implements Pick<User, 'id' | 'email' | 'role'> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty(swaggerType(Role))
  role: Role;
}
