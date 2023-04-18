import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LOCAL_GUARD } from 'src/common/consts';

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL_GUARD) {}
