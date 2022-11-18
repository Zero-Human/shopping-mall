import { Test, TestingModule } from '@nestjs/testing';
import { MarketService } from '../market/market.service';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
const mockMarketService = () => ({
  createMarket: jest.fn(),
});

const mockRepository = () => ({
  createUser: jest.fn(),
  registerSeller: jest.fn(),
});
jest.mock('bcrypt', () => {
  return {
    hash: jest.fn((e) => e),
  };
});
describe('UsersService', () => {
  let service: UserService;
  let spyRepository: UserRepository;
  let spyMarketService: MarketService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockRepository,
        },
        {
          provide: MarketService,
          useFactory: mockMarketService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    spyRepository = module.get<UserRepository>(UserRepository);
    spyMarketService = module.get<MarketService>(MarketService);
  });

  it('signUpUser() - 성공', async () => {
    const signUpUserDto: SignUpUserDto = {
      email: 'test@test.com',
      password: '!test123',
      passwordConfirm: '!test123',
      userName: 'userName',
      phone: '010-1234-1234',
    };
    await service.signUpUser(signUpUserDto);
    expect(spyRepository.createUser).toHaveBeenCalledTimes(1);
    expect(spyRepository.createUser).toHaveBeenCalledWith(signUpUserDto);
  });
  it('registerSeller() - 성공', async () => {
    const userId = 'qewddsfytkjy4twr3qdasczx';
    const registerSellerDto: RegisterSellerDto = {
      phone: 'phone',
      sellerName: 'sellerName',
      bank: 'bank',
      account: 'account',
      accountHolder: 'accountHolder',
    };
    await service.registerSeller(userId, registerSellerDto);
    expect(spyMarketService.createMarket).toHaveBeenCalledTimes(1);
    expect(spyMarketService.createMarket).toHaveBeenCalledWith(userId);
    expect(spyRepository.registerSeller).toHaveBeenCalledTimes(1);
    expect(spyRepository.registerSeller).toHaveBeenCalledWith(
      userId,
      registerSellerDto,
    );
  });

  it('makeHash() - 성공', async () => {
    const password = 'qewddsfytkjy4twr3qdasczx';

    const result = await service.makeHash(password);
    expect(bcrypt.hash).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 8);
    expect(result).toEqual(password);
  });
});
