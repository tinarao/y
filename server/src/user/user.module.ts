import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "user", schema: UserSchema}
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserModule]
})
export class UserModule {}