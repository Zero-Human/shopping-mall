import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from '../dto/signin-user.dto';
import { Payload } from './payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signinUserDto: SignInUserDto): Promise<{ accessToken: string }> {
    const { email, password } = signinUserDto;
    const user = await this.userRepository.findByEmail(email);
    if (!user || false === (await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('로그인 실패하였습니다.');
    }
    const payload: Payload = {
      userName: user.userName,
      id: user._id.toString(),
    };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
