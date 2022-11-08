import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(signUpUserDto: SignUpUserDto) {
    const createUser = new this.userModel(signUpUserDto);
    createUser.save();
  }
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).lean();
  }
  async findById(id: string) {
    return await this.userModel.findOne({ _id: id }).lean();
  }
  async registerSeller(userId: string, registerSellerDto: RegisterSellerDto) {
    return await this.userModel.updateOne(
      { _id: userId },
      { seller: registerSellerDto },
    );
  }
}
