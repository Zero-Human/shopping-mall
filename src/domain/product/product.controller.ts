import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetUserId } from '../users/decorator/get-user.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SellerGuard } from './guard/seller.guard';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('')
  @UseGuards(AuthGuard(), SellerGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'detail', maxCount: 10 },
      { name: 'thumbnail', maxCount: 8 },
    ]),
    new TransformInterceptor(),
  )
  async createProduct(
    @Body('product') createProductDto: CreateProductDto,
    @UploadedFiles()
    files: {
      detail?: Express.MulterS3.File[];
      thumbnail?: Express.MulterS3.File[];
    },
    @GetUserId() userId: string,
  ) {
    await this.productService.createProduct(files, userId, createProductDto);
    return Object.assign({
      statusCode: HttpStatus.CREATED,
      message: '상품 등록에 성공하였습니다.',
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard(), SellerGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'detail', maxCount: 10 },
      { name: 'thumbnail', maxCount: 8 },
    ]),
    new TransformInterceptor(),
  )
  async updateProduct(
    @UploadedFiles()
    files: {
      detail?: Express.MulterS3.File[];
      thumbnail?: Express.MulterS3.File[];
    },
    @Param('id') id: string,
    @Body('product') updateProductDto: UpdateProductDto,
  ) {
    await this.productService.updateProduct(files, id, updateProductDto);
    return Object.assign({
      statusCode: HttpStatus.OK,
      message: '상품 수정에 성공하였습니다.',
    });
  }
  @Delete(':id')
  @UseGuards(AuthGuard(), SellerGuard)
  async deleteProduct(@Param('id') id: string) {
    await this.productService.deleteProduct(id);
    return Object.assign({
      statusCode: HttpStatus.OK,
      message: '상품 삭제에 성공하였습니다.',
    });
  }
  @Get(':id')
  async getDetailProduct(@Param('id') id: string) {
    const data = await this.productService.getDetailProduct(id);
    return Object.assign({
      statusCode: HttpStatus.OK,
      data,
    });
  }
  @Get('')
  async getAllProduct(
    @Query('order') order: string,
    @Query('search') search: string,
    @Query('maincategory') mainCategory: string,
    @Query('subcategory') subCategory: string,
    @Query('country') country: string,
  ) {
    const countryList = country?.split('|');
    const maincategoryList = mainCategory?.split('|');
    const subcategoryList = subCategory?.split('|');
    const data = await this.productService.getAllProduct(
      maincategoryList,
      subcategoryList,
      countryList,
      order,
      search,
    );
    return Object.assign({
      statusCode: HttpStatus.OK,
      data,
    });
  }
}
