import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import {
  ImageType,
  MainCategory,
  ProductOption,
  PurchaseArea,
  SubCategory,
} from '../entity/product.entity';

export class UpdateProductDto {
  @MaxLength(80)
  @IsString()
  productName: string;
  @IsEnum(MainCategory)
  mainCategory: MainCategory;

  @IsEnum(SubCategory)
  subCategory: SubCategory;
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductOption)
  @IsObject()
  productOption: ProductOption;
  @IsNumber()
  price: number;
  @MaxLength(1000)
  @IsString()
  description: string;
  @IsOptional()
  @IsDateString()
  purchaseDate: Date;

  @IsEnum(PurchaseArea)
  purchaseArea: PurchaseArea;
  @IsDateString()
  purchaseDeadline: Date;
  @IsNumber()
  deliveryCharge: number;

  @IsOptional()
  detailImagePath: ImageType[];
  @IsOptional()
  thumbnailImagePath: ImageType[];
}
