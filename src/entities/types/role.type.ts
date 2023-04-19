import { EntityFields } from 'src/common/types';

import { Role } from '../role.entity';

type RoleEntity = Pick<Role, 'id' | 'permissions' | 'title' | 'users'>;

export const ROLE_FIELDS: EntityFields<RoleEntity> = {
  id: 'id',
  permissions: 'permissions',
  title: 'title',
  users: 'users',
};
