import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  MainCategory,
  ProductOption,
  PurchaseArea,
  SubCategory,
} from './entity/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './products.service';

const productoption: ProductOption = { optionName: 'optionName', count: 1 };
const mockProductService = () => ({
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
  getDetailProduct: jest.fn(() => {
    return {
      productName: 'productName',
      mainCategory: MainCategory.BAG,
      subCategory: SubCategory.BACKPACK,
      productOption: [productoption],
      price: 10000,
      description: 'description',
      purchaseDate: new Date(2020, 11, 12),
      purchaseArea: PurchaseArea.CHINA,
      purchaseDeadline: new Date(2020, 11, 12),
      deliveryCharge: 4000,
      createAt: new Date(2020, 11, 12),
    };
  }),
  getAllProduct: jest.fn(() => {
    return [
      {
        productName: 'productName',
        mainCategory: MainCategory.BAG,
        subCategory: SubCategory.BACKPACK,
        productOption: [productoption],
        price: 10000,
        description: 'description',
        purchaseDate: new Date(2020, 11, 12),
        purchaseArea: PurchaseArea.CHINA,
        purchaseDeadline: new Date(2020, 11, 12),
        deliveryCharge: 4000,
        createAt: new Date(2020, 11, 12),
      },
    ];
  }),
});

describe('ProductController', () => {
  let controller: ProductController;
  let spyService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [ProductController],
      providers: [{ provide: ProductService, useFactory: mockProductService }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    spyService = module.get<ProductService>(ProductService);
  });

  it('POST /products - 성공', async () => {
    const createProductDto: CreateProductDto = {
      productName: 'productName',
      mainCategory: MainCategory.BAG,
      subCategory: SubCategory.BACKPACK,
      productOption: { optionName: 'optionName', count: 1 },
      price: 10000,
      description: 'description',
      purchaseDate: new Date(),
      purchaseArea: PurchaseArea.CHINA,
      purchaseDeadline: new Date(),
      deliveryCharge: 4000,
    };
    const userId = '123eqwadsczx';

    const result = await controller.createProduct(createProductDto, userId);

    expect(spyService.createProduct).toHaveBeenCalled();
    expect(spyService.createProduct).toHaveBeenCalledWith(
      userId,
      createProductDto,
      undefined,
    );
    expect(result).toEqual({
      statusCode: 201,
      message: '상품 등록에 성공하였습니다.',
    });
  });

  it('PUT /products/:id - 성공', async () => {
    const updateProductDto: UpdateProductDto = {
      productName: 'productName',
      mainCategory: MainCategory.BAG,
      subCategory: SubCategory.BACKPACK,
      productOption: { optionName: 'optionName', count: 1 },
      price: 10000,
      description: 'description',
      purchaseDate: new Date(),
      purchaseArea: PurchaseArea.CHINA,
      purchaseDeadline: new Date(),
      deliveryCharge: 4000,
    };
    const id = '123eqwadsczx';

    const result = await controller.updateProduct(id, updateProductDto);

    expect(spyService.updateProduct).toHaveBeenCalled();
    expect(spyService.updateProduct).toHaveBeenCalledWith(
      id,
      updateProductDto,
      undefined,
    );
    expect(result).toEqual({
      statusCode: 200,
      message: '상품 수정에 성공하였습니다.',
    });
  });

  it('DELETE /products/:id - 성공', async () => {
    const id = '123eqwadsczx';

    const result = await controller.deleteProduct(id);

    expect(spyService.deleteProduct).toHaveBeenCalled();
    expect(spyService.deleteProduct).toHaveBeenCalledWith(id);
    expect(result).toEqual({
      statusCode: 200,
      message: '상품 삭제에 성공하였습니다.',
    });
  });

  it('GET /products - 성공', async () => {
    const id = '123eqwadsczx';

    const result = await controller.getDetailProduct(id);
    expect(spyService.getDetailProduct).toHaveBeenCalled();
    expect(spyService.getDetailProduct).toHaveBeenCalledWith(id);
    expect(result).toEqual({
      statusCode: 200,
      data: {
        productName: 'productName',
        mainCategory: MainCategory.BAG,
        subCategory: SubCategory.BACKPACK,
        productOption: [productoption],
        price: 10000,
        description: 'description',
        purchaseDate: new Date(2020, 11, 12),
        purchaseArea: PurchaseArea.CHINA,
        purchaseDeadline: new Date(2020, 11, 12),
        deliveryCharge: 4000,
        createAt: new Date(2020, 11, 12),
      },
    });
  });
  it('GET /products/:id - 성공', async () => {
    const order = 'order';
    const search = 'productName';
    const mainCategory = '의류';
    const subCategory = '남성';
    const country = '일본';

    const result = await controller.getAllProduct(
      order,
      search,
      mainCategory,
      subCategory,
      country,
    );
    expect(spyService.getAllProduct).toHaveBeenCalled();
    expect(spyService.getAllProduct).toHaveBeenCalledWith(
      [mainCategory],
      [subCategory],
      [country],
      order,
      search,
    );
    expect(result).toEqual({
      statusCode: 200,
      data: [
        {
          productName: 'productName',
          mainCategory: MainCategory.BAG,
          subCategory: SubCategory.BACKPACK,
          productOption: [productoption],
          price: 10000,
          description: 'description',
          purchaseDate: new Date(2020, 11, 12),
          purchaseArea: PurchaseArea.CHINA,
          purchaseDeadline: new Date(2020, 11, 12),
          deliveryCharge: 4000,
          createAt: new Date(2020, 11, 12),
        },
      ],
    });
  });
});
