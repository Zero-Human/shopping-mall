import { Module } from '@nestjs/common';
import { MarketModule } from './market/market.module';
import { PorductsModule } from './porducts/porducts.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [PorductsModule, UserModule, MarketModule],
  controllers: [],
  providers: [],
  exports: [PorductsModule, UserModule, MarketModule],
})
export class DomainModule {}
