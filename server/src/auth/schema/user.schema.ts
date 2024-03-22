import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tweet } from 'src/tweet/schema/tweet.schema';

export type UserDocument = HydratedDocument<User>;

type Role = "user" | "moderator" | "admin" | undefined

@Schema({ collection: 'users' })
export class User {
  @Prop()
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;

  @Prop({ default: "user" })
  role: Role

  @Prop({ default: "/avatarph.png"})
  avatar: string

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "tweets"})
  tweets: Tweet[]

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "tweets"})
  likedTweets: Tweet[]

  @Prop({ default: undefined })
  profileInfo: string

  @Prop()
  links: string[]

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "user"})
  subscribers: User[]

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "user"})
  subscribedTo: User[]

  @Prop()
  background: string

}

export const UserSchema = SchemaFactory.createForClass(User);