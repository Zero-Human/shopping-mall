import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Seller } from './seller.entity';

@Schema()
export class User extends Document {
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

  @Prop({ type: Seller })
  seller: Seller;
}

export const UserSchema = SchemaFactory.createForClass(User);
