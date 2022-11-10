import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClothingCategory = '남성' | '여성';
export type BagCategory = '에코백' | '백팩' | '기타';
export type ShoesCategory = '부츠' | '스니커즈' | '기타';

export class PurchaseArea {
  purchaseArea: '한국' | '일본' | '미국' | '중국';
}
export class MainCategory {
  mainCategory: '의류' | '가방' | '신발';
}
export class SubCategory {
  subCategory: ClothingCategory | BagCategory | ShoesCategory;
}
export class Image {
  originName: string;
  UuidName: string;
  path: string;
  rank: number;
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
  thumbnailImage: Image[];
  @Prop()
  detailImage: Image[];
  @Prop()
  purchaseArea: PurchaseArea;
  @Prop()
  purchaseDeadline: Date;
  @Prop()
  deliveryCharge: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
