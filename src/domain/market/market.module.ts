import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Market, MarketSchema } from './entity/market.entity';
import { MarketRepositroy } from './market.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Market.name, schema: MarketSchema }]),
  ],
  providers: [MarketService, MarketRepositroy],
  controllers: [MarketController],
  exports: [MarketService],
})
export class MarketModule {}
