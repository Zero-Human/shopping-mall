import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/domain/product/entity/product.entity';
import { User } from 'src/domain/users/entity/user.entity';

@Schema()
export class Market extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    required: false,
  })
  productList: Product[];
}

export const MarketSchema = SchemaFactory.createForClass(Market);
