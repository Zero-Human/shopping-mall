import { Module } from '@nestjs/common';
import { PorductsService } from './porducts.service';
import { PorductsController } from './porducts.controller';

@Module({
  providers: [PorductsService],
  controllers: [PorductsController],
})
export class PorductsModule {}
