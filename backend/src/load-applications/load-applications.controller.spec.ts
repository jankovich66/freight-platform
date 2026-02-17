import { Test, TestingModule } from '@nestjs/testing';
import { LoadAplicationsController } from './load-aplications.controller';

describe('LoadAplicationsController', () => {
  let controller: LoadAplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadAplicationsController],
    }).compile();

    controller = module.get<LoadAplicationsController>(LoadAplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
