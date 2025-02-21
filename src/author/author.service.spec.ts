import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import { QueryFailedError, Repository } from 'typeorm';
import { Author } from 'author/author.entity';

describe('AuthorService', () => {
  let service: AuthorService;
  let authorRepository:jest.Mocked<Repository<Author>>;

  const authors :Partial<Author>[] = [
    {id:1, name:'author1', email:'a.a@a',latestUpdate:new Date()},
    {id:2, name:'author2', email:'a.b@a',latestUpdate:new Date()},
    {id:3, name:'author3', email:'a.c@a',latestUpdate:new Date()},
    {id:4, name:'author4', email:'a.d@a',latestUpdate:new Date()},
  ];

  beforeEach(async () => {
    const fakeAuthorRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorService,{provide: 'AuthorRepository' , useValue:fakeAuthorRepository}],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    authorRepository = module.get<jest.Mocked<Repository<Author>>>('AuthorRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all authors', async () => {
    
    authorRepository.find.mockResolvedValue(authors as Author[]);
    expect(await service.findAll()).toEqual(authors);
  });

  for(const author of authors){
    it(`should return author by id ${author.id}`, async () => {
      authorRepository.findOne.mockResolvedValue(author as Author);
      expect(await service.findOne(author.id)).toEqual(author);
    });
  }
  it('should create author', async () => {
    const author = authors[0];
    authorRepository.save.mockResolvedValue(author as Author);
    expect(await service.createOne(author as Author)).toEqual(author);
  }
  );
  it('should update author', async () => {
    const author = authors[0];
    const updateData = {name:'author400', email:'a.a@b',latestUpdate:new Date()};
    authorRepository.save.mockResolvedValue(updateData as Author);
    authorRepository.findOne.mockResolvedValue(author as Author);
    expect(await service.updateOne(author.id,updateData as Author)).toEqual(updateData);
  }
  );
  it('should delete author', async () => {
    const author = authors[0];
    authorRepository.findOne.mockResolvedValue(author as Author);
    await service.deleteOne(author.id);
    expect(authorRepository.remove).toHaveBeenCalledWith(author);
  });
  it('should throw error if author not found', async () => {
    authorRepository.findOne.mockResolvedValue(null);
    try {
      await service.findOne(1);
    } catch (error) {
      expect(error.message).toBe('Author not found');
    }
  });
  it('should throw error if email already exists', async () => {
    const author = authors[0];
    authorRepository.save.mockRejectedValue(new QueryFailedError('', [], { message: 'Email already exists' ,name:'QueryFailedError'}));
    try {
      await service.createOne(author as Author);
    } catch (error) {
      expect(error.message).toBe('Email already exists');
    }
  }
  );
  it('should throw error if unexpected error occurred', async () => {
    const author = authors[0];
    authorRepository.save.mockRejectedValue({});
    try {
      await service.createOne(author as Author);
    } catch (error) {
      expect(error.message).toBe('An unexpected error occurred');
    }
  }
  );
});
