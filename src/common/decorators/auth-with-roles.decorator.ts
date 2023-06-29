import { UseGuards, applyDecorators } from '@nestjs/common';

import { JwtAuthGuard } from 'modules/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'modules/auth/guard/roles.guard';

import { Roles } from './roles.decorator';
import { Role } from '../constants/role.enum';

export const AuthWithRoles = (...roles: Role[]) =>
  applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard));
