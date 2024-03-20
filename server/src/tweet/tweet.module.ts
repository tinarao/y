import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetSchema } from './schema/tweet.schema';
import { UserSchema } from 'src/auth/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "tweets", schema: TweetSchema },
      { name: "users", schema: UserSchema }
    ])
  ],
  controllers: [TweetController],
  providers: [TweetService]
})
export class TweetModule { }
