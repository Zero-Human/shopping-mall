import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
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
    return await createProduct.save();
  }
  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    await this.productModel
      .findByIdAndUpdate({ _id: id }, updateProductDto)
      .exec();
  }
  async deleteById(id: string) {
    return await this.productModel.deleteOne({ _id: id });
  }
  async findById(id: string) {
    return await this.productModel.findOne({ _id: id });
  }
  async findAll(query: QueryOptions, sort: any) {
    return await this.productModel.find({ ...query }).sort(sort);
  }
}
