import { Test, TestingModule } from '@nestjs/testing';
import { MarketService } from '../market/market.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  MainCategory,
  ProductOption,
  PurchaseArea,
  SubCategory,
} from './entity/product.entity';
import { ProductRepository } from './product.repository';
import { ProductService } from './products.service';

const productoption: ProductOption = { optionName: 'optionName', count: 1 };
const mockMarketService = () => ({
  registerProduct: jest.fn(),
  deleteMarket: jest.fn(),
});

const mockRepository = () => ({
  createProduct: jest.fn(),
  findById: jest.fn(() => {
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
  updateProduct: jest.fn(),
  deleteById: jest.fn(),
  findAll: jest.fn(() => {
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
describe('ProductService', () => {
  let service: ProductService;
  let spyRepository: ProductRepository;
  let spyMarketService: MarketService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useFactory: mockRepository,
        },
        {
          provide: MarketService,
          useFactory: mockMarketService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    spyRepository = module.get<ProductRepository>(ProductRepository);
    spyMarketService = module.get<MarketService>(MarketService);
  });

  it('createProduct() - 성공', async () => {
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
    const userId = '123eqwdascz';

    await service.createProduct(userId, createProductDto);

    expect(spyRepository.createProduct).toHaveBeenCalled();
    expect(spyRepository.createProduct).toHaveBeenCalledWith(createProductDto);
    expect(spyMarketService.registerProduct).toHaveBeenCalled();
  });

  it('updateProduct() - 성공', async () => {
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
    const id = '123eqwdascz';

    await service.updateProduct(id, updateProductDto);

    expect(spyRepository.findById).toHaveBeenCalled();
    expect(spyRepository.findById).toHaveBeenCalledWith(id);
    expect(spyRepository.updateProduct).toHaveBeenCalled();
    expect(spyRepository.updateProduct).toHaveBeenCalledWith(
      id,
      updateProductDto,
    );
  });

  it('deleteProduct() - 성공', async () => {
    const id = '123eqwdascz';

    await service.deleteProduct(id);

    expect(spyRepository.findById).toHaveBeenCalled();
    expect(spyRepository.findById).toHaveBeenCalledWith(id);
    expect(spyRepository.deleteById).toHaveBeenCalled();
    expect(spyRepository.deleteById).toHaveBeenCalledWith(id);
    expect(spyMarketService.deleteMarket).toHaveBeenCalled();
    expect(spyMarketService.deleteMarket).toHaveBeenCalledWith({
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
    });
  });

  it('getDetailProduct() - 성공', async () => {
    const id = '123eqwdascz';

    const result = await service.getDetailProduct(id);

    expect(spyRepository.findById).toHaveBeenCalled();
    expect(spyRepository.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual({
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
    });
  });

  it('getAllProduct() - 성공', async () => {
    const order = 'order';
    const search = 'productName';
    const mainCategory = '의류';
    const subCategory = '남성';
    const country = '일본';

    const result = await service.getAllProduct(
      [mainCategory],
      [subCategory],
      [country],
      order,
      search,
    );

    expect(spyRepository.findAll).toHaveBeenCalled();
    expect(spyRepository.findAll).toHaveBeenCalledWith(
      [mainCategory],
      [subCategory],
      [country],
      order,
      search,
    );
    expect(result).toEqual([
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
    ]);
  });
});

// it('signUpUser() - 성공', async () => {
//   const signUpUserDto: SignUpUserDto = {
//     email: 'test@test.com',
//     password: '!test123',
//     passwordConfirm: '!test123',
//     userName: 'userName',
//     phone: '010-1234-1234',
//   };
//   await service.signUpUser(signUpUserDto);
//   expect(spyRepository.createUser).toHaveBeenCalledTimes(1);
//   expect(spyRepository.createUser).toHaveBeenCalledWith(signUpUserDto);
// });
