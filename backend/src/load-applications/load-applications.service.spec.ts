import { Test, TestingModule } from '@nestjs/testing';
import { LoadAplicationsService } from './load-aplications.service';

describe('LoadAplicationsService', () => {
  let service: LoadAplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadAplicationsService],
    }).compile();

    service = module.get<LoadAplicationsService>(LoadAplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
