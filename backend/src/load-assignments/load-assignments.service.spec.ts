import { Test, TestingModule } from '@nestjs/testing';
import { LoadAssignmentsService } from './load-assignments.service';

describe('LoadAssignmentsService', () => {
  let service: LoadAssignmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadAssignmentsService],
    }).compile();

    service = module.get<LoadAssignmentsService>(LoadAssignmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
