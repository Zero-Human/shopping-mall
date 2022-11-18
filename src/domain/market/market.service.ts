import { Injectable } from '@nestjs/common';
import { Product } from '../product/entity/product.entity';
import { MarketRepositroy } from './market.repository';

@Injectable()
export class MarketService {
  constructor(private readonly marketRepositroy: MarketRepositroy) {}

  async createMarket(userId: string) {
    await this.marketRepositroy.createMarket(userId);
  }
  async deleteProductInMarket(product: Product) {
    const market = await this.marketRepositroy.findByProduct(product._id);
    market.productList.splice(market.productList.indexOf(product._id), 1);
    await this.marketRepositroy.updateMarket(market);
  }
  async registerProduct(userId: string, product: Product) {
    const market = await this.marketRepositroy.findByUserId(userId);
    market.productList.push(product);
    await this.marketRepositroy.registerMarket(market);
  }
}
