import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';
import { DataSource, Repository } from 'typeorm';
import { Tweet } from './tweets.entity';

describe('TweetsService', () => {
  let service: TweetsService;
  let tweetsRepository: jest.Mocked<Repository<Tweet>>;
  let dataSource:jest.Mocked<DataSource>;

  beforeEach(async () => {
    const fakeTweetsRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };
    const fakeDataSource = {
      getRepository: jest.fn(() => fakeTweetsRepository),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsService, { provide: 'TweetRepository', useValue: fakeTweetsRepository },{ provide: DataSource, useValue: fakeDataSource }],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
    tweetsRepository = module.get<jest.Mocked<Repository<Tweet>>>('TweetRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return an array of tweets', async () => {
    const result : Partial<Tweet>[]= [{ id: 1, text: 'test tweet', authorId: 1 }];
    tweetsRepository.find.mockResolvedValue(result as Tweet[]);
    expect(await service.findAll()).toEqual(result);
  });
  it('should return a tweet by id', async () => {
    const result: Partial<Tweet> = { id: 1, text: 'test tweet', authorId: 1 };
    tweetsRepository.findOne.mockResolvedValue(result as Tweet);
    expect(await service.findOne(1)).toEqual(result);
  });
});
