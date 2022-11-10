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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SellerGuard } from './guard/seller.guard';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('')
  @UseGuards(AuthGuard(), SellerGuard)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.productService.createProduct(createProductDto);
    return Object.assign({
      statusCode: HttpStatus.CREATED,
      message: '상품 등록에 성공하였습니다.',
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard(), SellerGuard)
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
