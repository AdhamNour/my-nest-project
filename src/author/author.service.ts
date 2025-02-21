import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { CreateAuthorDTO } from './general.dto';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async createOne(authorData: CreateAuthorDTO): Promise<Author> {
    try {
      return await this.authorRepository.save(authorData);
    } catch (error) {
      console.log('error', error);

      if (error instanceof QueryFailedError) {
        throw new BadRequestException('Email already exists');
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new BadRequestException('Author not found');
    }
    return author;
  }

  async updateOne(id: number, updateData: Partial<CreateAuthorDTO>): Promise<Author> {
    const author = await this.findOne(id);
    Object.assign(author, updateData);
    return this.authorRepository.save(author);
  }

  async deleteOne(id: number): Promise<void> {
    const author = await this.findOne(id);
    await this.authorRepository.remove(author);
  }
}
