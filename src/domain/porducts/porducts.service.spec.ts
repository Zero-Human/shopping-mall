import { Test, TestingModule } from '@nestjs/testing';
import { PorductsService } from './porducts.service';

describe('PorductsService', () => {
  let service: PorductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PorductsService],
    }).compile();

    service = module.get<PorductsService>(PorductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
