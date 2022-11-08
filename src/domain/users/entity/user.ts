import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  id: string;

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
