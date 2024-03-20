import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TweetModule } from './tweet/tweet.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    UserModule,
    TweetModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
