import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from './entities/session.entity';
import { SessionRepository } from './session.repository';
import { SessionService } from './session.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
  ],
  providers: [SessionService, SessionRepository],
  exports: [SessionService],
})
export class SessionModule {}
