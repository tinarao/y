import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

type Role = "user" | "moderator" | "admin" | undefined

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  bio: string;

  @Prop()
  fullName: string;

  @Prop({ default: "user" })
  role: Role

  @Prop({ default: "/avatarph.png"})
  avatar: string

}

export const UserSchema = SchemaFactory.createForClass(User);