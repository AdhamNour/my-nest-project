import { Test, TestingModule } from '@nestjs/testing';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

describe('TweetsController', () => {
  let controller: TweetsController;
  let service: jest.Mocked<TweetsService>;
  beforeEach(async () => {
    const fakeTweetsService={
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TweetsController],
      providers:[{ provide: TweetsService, useValue: fakeTweetsService }],
    }).compile();

    controller = module.get<TweetsController>(TweetsController);
    service = module.get<jest.Mocked<TweetsService>>(TweetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
