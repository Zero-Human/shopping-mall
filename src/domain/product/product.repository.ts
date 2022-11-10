import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async createProduct(createProductDto: CreateProductDto) {
    const createProduct = new this.productModel(createProductDto);
    createProduct.createAt = new Date();
    createProduct.save();
  }
  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    await this.productModel.findByIdAndUpdate({ id }, updateProductDto).exec();
  }
  async deleteById(id: string) {
    return await this.productModel.deleteOne({ id });
  }
  async findById(id: string) {
    return await this.productModel.findOne({ id });
  }
  async findAll(
    mainCategoryList: string[],
    subCategoryList: string[],
    countryList: string[],
    order: string,
    search: string,
  ) {
    let data = await this.productModel.find().lean();
    if (mainCategoryList) {
      data = data.filter(
        (e) =>
          -1 !==
          mainCategoryList.findIndex(
            (mainCategory) => mainCategory === e.mainCategory,
          ),
      );
    }
    if (subCategoryList) {
      data = data.filter(
        (e) =>
          -1 !==
          subCategoryList.findIndex(
            (subCategory) => subCategory === e.subCategory,
          ),
      );
    }
    if (countryList) {
      data = data.filter(
        (e) =>
          -1 !== countryList.findIndex((country) => country === e.purchaseArea),
      );
    }
    if (search) {
      data = data.filter((e) => String(e.productName).includes(search));
    }
    if (order === 'purchaseDeadline') {
      data.sort((a, b) => (a.purchaseDeadline > b.purchaseDeadline ? 1 : -1));
    } else {
      data.sort((a, b) => (a.createAt < b.createAt ? 1 : -1));
    }
    return data;
  }
}
