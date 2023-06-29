import { EntityFields } from 'common/types';

import { Role } from '../role.entity';

type RoleEntity = Pick<Role, 'id' | 'title' | 'users'>;

export const ROLE_FIELDS: EntityFields<RoleEntity> = {
  id: 'id',
  title: 'title',
  users: 'users',
};
