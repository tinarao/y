import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

export type TweetDocument = HydratedDocument<Tweet>;

@Schema()
export class Tweet {

    @Prop({ maxlength: 140, minlength: 1, required: true })
    text: string;

    @Prop({ default: 0 })
    likes: number;

    @Prop({ default: 0 })
    reposts: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    author: User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    repostedPeople: User[]

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" })
    comments: Tweet[]

}

export const TweetSchema = SchemaFactory.createForClass(Tweet);