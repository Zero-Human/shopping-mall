import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpUserDto } from './dto/signup-user.dto';
import { User, UserDocument } from './entity/user';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(signUpUserDto: SignUpUserDto) {
    const createUser = new this.userModel(signUpUserDto);
    createUser.save();
  }
  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).lean();
  }
  async findById(id: string): Promise<User> {
    return await this.userModel.findOne({ id }).lean();
  }
}
