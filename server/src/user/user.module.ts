import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/schema/user.schema';
import { TweetSchema } from 'src/tweet/schema/tweet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "user", schema: UserSchema },
      { name: "tweets", schema: TweetSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserModule]
})
export class UserModule { }
