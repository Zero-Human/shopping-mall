import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../product/entity/product.entity';
import { Market } from './entity/market.entity';

@Injectable()
export class MarketRepositroy {
  constructor(@InjectModel(Market.name) private marketModel: Model<Market>) {}

  async createMarket(userId: string) {
    const createMarket = new this.marketModel({ userId: userId });
    await createMarket.save();
  }
  async registerMarket(market: Market) {
    return await this.marketModel
      .updateOne({ _id: market._id }, { productList: market.productList })
      .exec();
  }
  async updateMarket(market: Market) {
    return await this.marketModel
      .updateOne({ _id: market._id }, { productList: market.productList })
      .exec();
  }
  async findByUserId(userId: string) {
    return await this.marketModel.findOne({ userId });
  }
  async findByProduct(productId: string) {
    return await this.marketModel.findOne({ productList: productId });
  }
}
