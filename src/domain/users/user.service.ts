import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dto/signup-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { MarketService } from '../market/market.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly marketService: MarketService,
  ) {}

  async signUpUser(signUpUserDto: SignUpUserDto) {
    if (signUpUserDto.password !== signUpUserDto.passwordConfirm) {
      throw new BadRequestException(' 비밀번호와 비밀번호확인이 다릅니다.');
    }
    signUpUserDto.password = await this.makeHash(signUpUserDto.password);
    await this.userRepository.createUser(signUpUserDto);
  }

  async registerSeller(userId: string, registerSellerDto: RegisterSellerDto) {
    await this.marketService.createMarket(userId);
    await this.userRepository.registerSeller(userId, registerSellerDto);
  }

  async makeHash(password: string) {
    return await await bcrypt.hash(password, 8);
  }
}
