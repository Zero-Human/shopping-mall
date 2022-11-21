import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from 'aws-sdk';
import { MarketService } from '../market/market.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  MainCategory,
  ProductOption,
  PurchaseArea,
  SubCategory,
  ImageType,
} from './entity/product.entity';
import { ProductRepository } from './product.repository';
import { ProductService } from './products.service';

const productoption: ProductOption = { optionName: 'optionName', count: 1 };
const mockMarketService = () => ({
  registerProduct: jest.fn(),
  deleteProductInMarket: jest.fn(),
});
const emptyImageTypeList: ImageType[] = [];
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
      detailImagePath: emptyImageTypeList,
      thumbnailImagePath: emptyImageTypeList,
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
      imports: [ConfigModule],
      providers: [
        ConfigService,
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
    const detail: Express.MulterS3.File[] = [];
    const thumbnail: Express.MulterS3.File[] = [];
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
    const files = {
      detail: detail,
      thumbnail: thumbnail,
    };
    await service.createProduct(userId, createProductDto, files);

    expect(spyRepository.createProduct).toHaveBeenCalled();
    expect(spyRepository.createProduct).toHaveBeenCalledWith(
      emptyImageTypeList,
      emptyImageTypeList,
      createProductDto,
    );
    expect(spyMarketService.registerProduct).toHaveBeenCalled();
  });

  it('updateProduct() - 성공', async () => {
    const detail: Express.MulterS3.File[] = [];
    const thumbnail: Express.MulterS3.File[] = [];
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
    service.deleteFile = jest.fn();
    const files = {
      detail: detail,
      thumbnail: thumbnail,
    };

    await service.updateProduct(id, updateProductDto, files);

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
    const detailImagePath: ImageType[] = [];
    const thumbnailImagePath: ImageType[] = [];
    service.deleteFile = jest.fn();

    await service.deleteProduct(id);

    expect(spyRepository.findById).toHaveBeenCalled();
    expect(spyRepository.findById).toHaveBeenCalledWith(id);
    expect(spyRepository.deleteById).toHaveBeenCalled();
    expect(spyRepository.deleteById).toHaveBeenCalledWith(id);
    expect(spyMarketService.deleteProductInMarket).toHaveBeenCalled();
    expect(spyMarketService.deleteProductInMarket).toHaveBeenCalledWith({
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
      detailImagePath: detailImagePath,
      thumbnailImagePath: thumbnailImagePath,
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
      thumbnailImagePath: emptyImageTypeList,
      detailImagePath: emptyImageTypeList,
    });
  });

  it('getAllProduct() - 성공', async () => {
    const order = 'order';
    const search = 'productName';
    const mainCategory = '의류';
    const subCategory = '남성';
    const country = '일본';

    const data = service.createQueryOption(
      [mainCategory],
      [subCategory],
      [country],
      search,
    );

    const result = await service.getAllProduct(
      [mainCategory],
      [subCategory],
      [country],
      order,
      search,
    );

    expect(spyRepository.findAll).toHaveBeenCalled();
    expect(spyRepository.findAll).toHaveBeenCalledWith(data, { createAt: -1 });
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
