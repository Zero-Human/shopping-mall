import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryOptions } from 'mongoose';
import { MarketService } from '../market/market.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ImageType, Product } from './entity/product.entity';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  private s3: AWS.S3;
  private bucket: string;
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly marketService: MarketService,
    private configService: ConfigService,
  ) {
    this.bucket = configService.get('AWS_BUCKET_NAME');
    this.s3 = new AWS.S3({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_BUCKET_REGION'),
    });
  }

  async createProduct(
    userId: string,
    createProductDto: CreateProductDto,
    files?: {
      detail?: Express.MulterS3.File[];
      thumbnail?: Express.MulterS3.File[];
    },
  ) {
    const detailImageList: ImageType[] = this.makeImageTypeList(files.detail);
    const thumbnailImageList: ImageType[] = this.makeImageTypeList(
      files.thumbnail,
    );

    const product = await this.productRepository.createProduct(
      detailImageList,
      thumbnailImageList,
      createProductDto,
    );

    await this.marketService.registerProduct(userId, product);
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
    files?: {
      detail?: Express.MulterS3.File[];
      thumbnail?: Express.MulterS3.File[];
    },
  ) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new BadRequestException('해당 상품이 없습니다.');
    }
    await this.deleteFile(product);
    updateProductDto.detailImagePath = this.makeImageTypeList(files.detail);
    updateProductDto.thumbnailImagePath = this.makeImageTypeList(
      files.thumbnail,
    );
    await this.productRepository.updateProduct(id, updateProductDto);
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new BadRequestException('해당 상품이 없습니다.');
    }
    await this.marketService.deleteProductInMarket(product);
    await this.productRepository.deleteById(id);
    await this.deleteFile(product);
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

  makeImageTypeList(imageList: Express.MulterS3.File[]) {
    if (imageList === undefined) {
      return [];
    }
    return imageList.map((element, index) => {
      return {
        name: element.key,
        path: element.location,
        sequence: index,
      };
    });
  }

  async deleteFile(product: Product) {
    const deleteDetilImage = product.detailImagePath.map((element) => {
      return { Key: element.name };
    });
    const deleteThumbnailImage = product.thumbnailImagePath.map((element) => {
      return { Key: element.name };
    });
    await this.s3
      .deleteObjects({
        Bucket: this.bucket,
        Delete: {
          Objects: [...deleteThumbnailImage, ...deleteDetilImage],
          Quiet: false,
        },
      })
      .promise();
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
