import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { AuthorRepository } from './author.repository';
import { CreateAuthorDTO } from './general.dto';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: AuthorRepository,
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
}
