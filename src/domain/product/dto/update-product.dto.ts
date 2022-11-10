import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsObject, IsString } from 'class-validator';
import {
  MainCategory,
  ProductOption,
  PurchaseArea,
  SubCategory,
} from '../entity/product.entity';

export class UpdateProductDto {
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
