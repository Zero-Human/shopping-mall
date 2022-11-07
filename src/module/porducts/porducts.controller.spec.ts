import { Test, TestingModule } from '@nestjs/testing';
import { PorductsController } from './porducts.controller';

describe('PorductsController', () => {
  let controller: PorductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PorductsController],
    }).compile();

    controller = module.get<PorductsController>(PorductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
