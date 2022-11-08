import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
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
}
