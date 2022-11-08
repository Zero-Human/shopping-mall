import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: ObjectId;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  userName: string;

  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
