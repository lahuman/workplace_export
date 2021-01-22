import { Test, TestingModule } from '@nestjs/testing';
import { WorkplaceController } from './workplace.controller';

describe('WorkplaceController', () => {
  let controller: WorkplaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkplaceController],
    }).compile();

    controller = module.get<WorkplaceController>(WorkplaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
