import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JWT_REFRESH_TOKEN_GUARD } from 'src/common/consts';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard(
  JWT_REFRESH_TOKEN_GUARD,
) {}
