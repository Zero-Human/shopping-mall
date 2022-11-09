import { Module } from '@nestjs/common';
import { MarketModule } from './market/market.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [ProductModule, UserModule, MarketModule],
  controllers: [],
  providers: [],
  exports: [ProductModule, UserModule, MarketModule],
})
export class DomainModule {}
