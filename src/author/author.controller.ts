import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAuthorDTO } from './general.dto';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async findAll() {
    return this.authorService.findAll();
  }

  @Post()
  async createOne(@Body() authorData: CreateAuthorDTO) {
    return this.authorService.createOne(authorData);
  }
}
