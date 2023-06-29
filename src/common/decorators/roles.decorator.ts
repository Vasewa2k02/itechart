import { SetMetadata } from '@nestjs/common';

import { METADATA_KEYS } from '../constants/common';
import { Role } from '../constants/role.enum';

export const Roles = (...roles: Role[]) =>
  SetMetadata(METADATA_KEYS.roles, roles);
