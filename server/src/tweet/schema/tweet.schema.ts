import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

export type TweetDocument = HydratedDocument<Tweet>;

@Schema({ collection: 'tweets', timestamps: true })
export class Tweet {

  @Prop()
  text: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "user"})
  author: User

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "user"})
  peopleWhoLiked: User[]

  @Prop({ default: 0 })
  likes: number

  @Prop({ default: 0 })
  retweets: number

}

export const TweetSchema = SchemaFactory.createForClass(Tweet);