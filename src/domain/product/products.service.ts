import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryOptions } from 'mongoose';
import { MarketService } from '../market/market.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly marketService: MarketService,
  ) {}

  async createProduct(userId: string, createProductDto: CreateProductDto) {
    const product = await this.productRepository.createProduct(
      createProductDto,
    );
    await this.marketService.registerProduct(userId, product);
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
    await this.marketService.deleteMarket(product);
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
    const query = this.createQueryOption(
      mainCategoryList,
      subCategoryList,
      countryList,
      search,
    );
    let sort: { purchaseDeadline?: number; createAt?: number };
    if (order === 'purchaseDeadline') {
      sort = { purchaseDeadline: 1 };
    } else {
      sort = { createAt: -1 };
    }
    return await this.productRepository.findAll(query, sort);
  }
  createQueryOption(
    mainCategoryList: string[],
    subCategoryList: string[],
    countryList: string[],
    search: string,
  ) {
    const query: QueryOptions = {};
    if (mainCategoryList) {
      query['mainCategory'] = { $in: mainCategoryList };
    }
    if (subCategoryList) {
      query['subCategory'] = { $in: subCategoryList };
    }
    if (countryList) {
      query['purchaseArea'] = { $in: countryList };
    }
    if (search) {
      query['productName'] = search;
    }
    return query;
  }
}
