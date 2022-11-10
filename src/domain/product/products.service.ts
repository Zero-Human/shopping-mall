import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(createProductDto: CreateProductDto) {
    await this.productRepository.createProduct(createProductDto);
  }
  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new BadRequestException('해당 상품이 없습니다.');
    }
    await this.productRepository.updateProduct(id, updateProductDto);
  }
  async deleteProduct(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new BadRequestException('해당 상품이 없습니다.');
    }
    await this.productRepository.deleteById(id);
  }
  async getDetailProduct(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new BadRequestException('해당 상품이 없습니다.');
    }
    return product;
  }
  async getAllProduct(
    mainCategoryList: string[],
    subCategoryList: string[],
    countryList: string[],
    order: string,
    search: string,
  ) {
    return await this.productRepository.findAll(
      mainCategoryList,
      subCategoryList,
      countryList,
      order,
      search,
    );
  }
}
