import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth/auth.service';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { RegisterSellerDto } from './dto/register-seller.dto';

const mockUserService = () => ({
  signUpUser: jest.fn(),
  registerSeller: jest.fn(),
});

const mockAuthService = () => ({
  signIn: jest.fn(() => {
    return 'token';
  }),
});

describe('UsersController', () => {
  let controller: UserController;
  let spyUserService: UserService;
  let spyAuthService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: mockUserService,
        },
        {
          provide: AuthService,
          useFactory: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    spyUserService = module.get<UserService>(UserService);
    spyAuthService = module.get<AuthService>(AuthService);
  });

  it('POST users/signup - 성공', async () => {
    const signUpUserDto: SignUpUserDto = {
      email: 'test@test.com',
      password: '!test123',
      passwordConfirm: '!test123',
      userName: 'userName',
      phone: '010-1234-1234',
    };
    const result = await controller.signUpUser(signUpUserDto);
    expect(spyUserService.signUpUser).toHaveBeenCalled();
    expect(spyUserService.signUpUser).toHaveBeenCalledWith(signUpUserDto);
    expect(result).toEqual({
      statusCode: 201,
      message: '화원가입에 성공하였습니다.',
    });
  });

  it('POST users/signin - 성공', async () => {
    const signInUSerDto: SignInUserDto = {
      email: 'test@test.com',
      password: '!test123',
    };
    const result = await controller.signInUser(signInUSerDto);
    expect(spyAuthService.signIn).toHaveBeenCalled();
    expect(spyAuthService.signIn).toHaveBeenCalledWith(signInUSerDto);
    expect(result).toEqual({
      statusCode: 200,
      token: 'token',
    });
  });

  it('POST users/seller/register - 성공', async () => {
    const userId = 'qewddsfytkjy4twr3qdasczx';
    const registerSellerDto: RegisterSellerDto = {
      phone: 'phone',
      sellerName: 'sellerName',
      bank: 'bank',
      account: 'account',
      accountHolder: 'accountHolder',
    };
    const result = await controller.registerSeller(userId, registerSellerDto);
    expect(spyUserService.registerSeller).toHaveBeenCalled();
    expect(spyUserService.registerSeller).toHaveBeenCalledWith(
      userId,
      registerSellerDto,
    );
    expect(result).toEqual({
      statusCode: 200,
      message: '셀러 등록에 성공하였습니다.',
    });
  });
});
