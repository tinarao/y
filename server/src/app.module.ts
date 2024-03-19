import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TweetController } from './tweet/tweet.controller';
import { TweetService } from './tweet/tweet.service';
import { TweetModule } from './tweet/tweet.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    TweetModule
  ],
  controllers: [AppController, TweetController],
  providers: [AppService, TweetService],
})
export class AppModule {}
