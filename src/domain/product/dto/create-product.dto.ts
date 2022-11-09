import {
  MainCategory,
  SubCategory,
  Image,
  PurchaseArea,
  ProductOption,
} from '../entity/product.entity';

export class CreateProductDto {
  productName: string;
  mainCategory: MainCategory;
  subCategory: SubCategory;
  productOption: ProductOption;
  price: number;
  description: string;
  purchaseDate: Date;
  thumbnailImage: Image[];
  detailImage: Image[];
  purchaseArea: PurchaseArea;
  purchaseDeadline: Date;
  deliveryCharge: number;
}
