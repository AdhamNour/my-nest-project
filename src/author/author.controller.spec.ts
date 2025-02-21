import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { Author } from 'author/author.entity';

describe('AuthorController', () => {
  let controller: AuthorController;
  let authorService:jest.Mocked<AuthorService>;

  beforeEach(async () => {
    const fakeAuthorService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      createOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [{provide: AuthorService , useValue:fakeAuthorService}],
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
    authorService = module.get<jest.Mocked<AuthorService>>(AuthorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return all authors', async () => {
    authorService.findAll.mockResolvedValue([]);
    expect(await controller.findAll()).toEqual([]);
  }
  );
  it('should return author by id', async () => {
    const author = {id:1, name:'author1', email:'a.a@a',latestUpdate:new Date()};
    authorService.findOne.mockResolvedValue(author as Author);
    expect(await controller.findOne(author.id)).toEqual(author);
  }
  );
  it('should create author', async () => {
    const author = {id:1, name:'author1', email:'a.a@a',latestUpdate:new Date()};
    authorService.createOne.mockResolvedValue(author as Author);
    expect(await controller.createOne(author as Author)).toEqual(author);
  }
  );
  it('should update author', async () => {
    const author = {id:1, name:'author1', email:'a.a@a',latestUpdate:new Date()};
    const updateData = {name:'author400', email:'a.a@b',latestUpdate:new Date()};
    authorService.updateOne.mockResolvedValue(updateData as Author);
    authorService.findOne.mockResolvedValue(author as Author);
    expect(await controller.updateOne(author.id,updateData as Author)).toEqual(updateData);
  }
  );
  it('should delete author', async () => {
    const author = {id:1, name:'author1', email:'a.a@a',latestUpdate:new Date()};
    authorService.deleteOne.mockResolvedValue();
    expect(await controller.deleteOne(author.id)).toBeUndefined();
  }
  );
  it('should throw error if author not found on finding', async () => {
    const author = {id:1, name:'author1', email:'a.a@a',latestUpdate:new Date()};
    authorService.findOne.mockRejectedValue(new Error());
    expect(controller.findOne(author.id)).rejects.toThrowError();
  }
  );
  it('should throw error if email already exists', async () => {
    const author = {id:1, name:'author1', email:'a.a@a',latestUpdate:new Date()};
    authorService.createOne.mockRejectedValue(new Error());
    expect(controller.createOne(author as Author)).rejects.toThrowError();
  }
  );
  it('should throw error if author not found on updating', async () => {
    const author = {id:1, name:'author1', email:'a.a@a',latestUpdate:new Date()};
    authorService.updateOne.mockRejectedValue(new Error());
    expect(controller.updateOne(author.id,author as Author)).rejects.toThrowError();
  }
  );
});
