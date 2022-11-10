import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsObject, IsString } from 'class-validator';
import {
  MainCategory,
  SubCategory,
  PurchaseArea,
  ProductOption,
} from '../entity/product.entity';

export class CreateProductDto {
  @IsString()
  productName: string;
  @Type(() => MainCategory)
  @IsString()
  mainCategory: MainCategory;
  @Type(() => SubCategory)
  @IsString()
  subCategory: SubCategory;
  @Type(() => ProductOption)
  @IsObject()
  productOption: ProductOption;
  @IsNumber()
  price: number;
  @IsString()
  description: string;
  @IsDateString()
  purchaseDate: Date;
  @Type(() => PurchaseArea)
  @IsString()
  purchaseArea: PurchaseArea;
  @IsDateString()
  purchaseDeadline: Date;
  @IsNumber()
  deliveryCharge: number;
}
