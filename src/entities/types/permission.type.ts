import { EntityFields } from 'src/common/types';

import { Permission } from '../permission.entity';

type PermissionEntity = Pick<
  Permission,
  'id' | 'context' | 'descriptor' | 'method' | 'role'
>;

export const PERMISSION_FIELDS: EntityFields<PermissionEntity> = {
  id: 'id',
  context: 'context',
  descriptor: 'descriptor',
  method: 'method',
  role: 'role',
};
