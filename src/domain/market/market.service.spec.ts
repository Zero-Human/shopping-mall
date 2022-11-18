import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../product/entity/product.entity';
import { Market } from './entity/market.entity';
import { MarketRepositroy } from './market.repository';
import { MarketService } from './market.service';

const market = {
  _id: 1,
  productList: {
    splice: jest.fn(),
    indexOf: jest.fn(),
    push: jest.fn(),
  },
} as unknown as Market;

const mockRepository = () => ({
  createMarket: jest.fn(),
  updateMarket: jest.fn(),
  findByProduct: jest.fn(() => market),
  findByUserId: jest.fn(() => market),
  registerMarket: jest.fn(),
});

describe('MarketService', () => {
  let service: MarketService;
  let spyRepository: MarketRepositroy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketService,
        {
          provide: MarketRepositroy,
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MarketService>(MarketService);
    spyRepository = module.get<MarketRepositroy>(MarketRepositroy);
  });

  it('createMarket()', async () => {
    const userId = 'asdcxvvgh';

    await service.createMarket(userId);

    expect(spyRepository.createMarket).toHaveBeenCalled();
    expect(spyRepository.createMarket).toHaveBeenCalledWith(userId);
  });

  it('deleteProductInMarket()', async () => {
    const product = {
      _id: 1,
    } as Product;
    product._id = 'productId';

    await service.deleteProductInMarket(product);

    expect(spyRepository.findByProduct).toHaveBeenCalled();
    expect(spyRepository.findByProduct).toHaveBeenCalledWith(product._id);
    expect(spyRepository.updateMarket).toHaveBeenCalled();
    expect(spyRepository.updateMarket).toHaveBeenCalledWith(market);
  });

  it('registerProduct()', async () => {
    const product = {
      _id: 1,
    } as Product;
    product._id = 'productId';
    const userId = 'userId';

    await service.registerProduct(userId, product);

    expect(spyRepository.findByUserId).toHaveBeenCalled();
    expect(spyRepository.findByUserId).toHaveBeenCalledWith(userId);
    expect(spyRepository.registerMarket).toHaveBeenCalled();
    expect(spyRepository.registerMarket).toHaveBeenCalledWith(market);
  });
});
