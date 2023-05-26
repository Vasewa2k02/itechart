import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';

import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { WinstonLoggerModule } from './modules/winston-logger/winston-logger.module';
import { PostModule } from './modules/post/post.module';
import { LikeModule } from './modules/like/like.module';
import { CommentModule } from './modules/comment/comment.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    MongooseModule.forRoot(String(process.env.DATABASE_URL), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    WinstonModule.forRoot({}),
    AuthModule,
    UserModule,
    WinstonLoggerModule,
    PostModule,
    LikeModule,
    CommentModule,
    BookmarkModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
