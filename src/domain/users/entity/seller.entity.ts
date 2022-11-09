import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Seller extends Document {
  @Prop()
  phone: string;

  @Prop()
  sellerName: string;

  @Prop()
  bank: string;

  @Prop()
  account: string;

  @Prop()
  accountHolder: string;
}
