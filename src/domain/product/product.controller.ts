import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SellerGuard } from './guard/seller.guard';
import { ProductService } from './products.service';

@Controller('products')
@UseGuards(AuthGuard(), SellerGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.productService.createProduct(createProductDto);
    return Object.assign({
      statusCode: HttpStatus.CREATED,
      message: '상품 등록에 성공하였습니다.',
    });
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productService.updateProduct(id, updateProductDto);
    return Object.assign({
      statusCode: HttpStatus.OK,
      message: '상품 수정에 성공하였습니다.',
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
}
