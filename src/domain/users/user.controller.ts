import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { GetUserId } from './decorator/get-user.decorator';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async signUpUser(@Body() signUpUserDto: SignUpUserDto) {
    await this.userService.signUpUser(signUpUserDto);
    return Object.assign({
      statusCode: HttpStatus.CREATED,
      message: '화원가입에 성공하였습니다.',
    });
  }
  @Post('/signin')
  async signInUser(@Body() signInUSerDto: SignInUserDto) {
    const token = await this.authService.signIn(signInUSerDto);
    return Object.assign({
      statusCode: HttpStatus.OK,
      token,
    });
  }
  @Post('/seller/register')
  @UseGuards(AuthGuard())
  async registerSeller(
    @GetUserId() userId: string,
    @Body() registerSellerDto: RegisterSellerDto,
  ) {
    await this.userService.registerSeller(userId, registerSellerDto);
    return Object.assign({
      statusCode: HttpStatus.OK,
      message: '셀러 등록에 성공하였습니다.',
    });
  }
}
