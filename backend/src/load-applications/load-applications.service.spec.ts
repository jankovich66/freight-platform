import { Test, TestingModule } from '@nestjs/testing';
import { LoadApplicationsService } from './load-applications.service';

describe('LoadAplicationsService', () => {
  let service: LoadApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadApplicationsService],
    }).compile();

    service = module.get<LoadApplicationsService>(LoadApplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
