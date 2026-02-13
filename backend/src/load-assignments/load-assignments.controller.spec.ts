import { Test, TestingModule } from '@nestjs/testing';
import { LoadAssignmentsController } from './load-assignments.controller';

describe('LoadAssignmentsController', () => {
  let controller: LoadAssignmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadAssignmentsController],
    }).compile();

    controller = module.get<LoadAssignmentsController>(LoadAssignmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
