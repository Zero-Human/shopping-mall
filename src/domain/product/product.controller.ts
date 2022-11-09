import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { SellerGuard } from './guard/seller.guard';
import { ProductService } from './products.service';

@Controller('products')
@UseGuards(AuthGuard(), SellerGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('/')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.productService.createProduct(createProductDto);
    return Object.assign({
      statusCode: HttpStatus.CREATED,
      message: '상품 등록에 성공하였습니다.',
    });
  }
}
