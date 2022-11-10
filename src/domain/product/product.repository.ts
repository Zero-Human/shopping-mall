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
    createProduct.save();
  }
  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    await this.productModel.findByIdAndUpdate({ id }, updateProductDto).exec();
  }
  async findById(id: string) {
    return await this.productModel.findOne({ id });
  }
}
