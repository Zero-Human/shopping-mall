import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PorductModule } from './porduct/porduct.module';
import { PorductㄴModule } from './porductㄴ/porductㄴ.module';
import { PorductsModule } from './porducts/porducts.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { MarketModule } from './market/market.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [PorductModule, PorductㄴModule, PorductsModule, UsersModule, MarketModule, ConfigModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, ConfigService],
})
export class AppModule {}
