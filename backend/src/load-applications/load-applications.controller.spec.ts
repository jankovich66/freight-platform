import { Test, TestingModule } from '@nestjs/testing';
import { LoadApplicationsController } from './load-applications.controller';

describe('LoadAplicationsController', () => {
  let controller: LoadApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadApplicationsController],
    }).compile();

    controller = module.get<LoadApplicationsController>(LoadApplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
