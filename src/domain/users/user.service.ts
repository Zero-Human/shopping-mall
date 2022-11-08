import { Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dto/signup-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUpUser(signUpUserDto: SignUpUserDto) {
    signUpUserDto.password = await this.makeHash(signUpUserDto.password);
    await this.userRepository.createUser(signUpUserDto);
  }

  async makeHash(password: string) {
    return await await bcrypt.hash(password, 8);
  }
}
