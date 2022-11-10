import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum PurchaseArea {
  KOREA = '한국',
  JAPAN = '일본',
  USA = '미국',
  CHINA = '중국',
}
export enum MainCategory {
  CLOTHING = '의류',
  BAG = '가방',
  CHOES = '신발',
}
export enum SubCategory {
  MALE = '남성',
  FEMALE = '여성',
  ECO_BAG = '에코백',
  BACKPACK = '백팩',
  ETC = '기타',
  BOOTS = '부츠',
  SNEEZE = '스니커즈',
}

export class ProductOption {
  optionName: string;
  count: number;
}

@Schema()
export class Product extends Document {
  @Prop()
  productName: string;
  @Prop()
  mainCategory: MainCategory;
  @Prop()
  subCategory: SubCategory;
  @Prop()
  productOption: ProductOption[];
  @Prop()
  price: number;
  @Prop()
  description: string;
  @Prop()
  purchaseDate: Date;
  @Prop()
  purchaseArea: PurchaseArea;
  @Prop()
  purchaseDeadline: Date;
  @Prop()
  deliveryCharge: number;
  @Prop()
  createAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
