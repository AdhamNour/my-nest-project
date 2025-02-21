import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAuthorDTO } from './general.dto';
import { AuthorService } from './author.service';
import { Param, Put, Delete } from '@nestjs/common';
import { UpdateAuthorDTO } from './general.dto';

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
  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.authorService.findOne(id);
  }

  @Put('/:id')
  async updateOne(@Param('id') id: number, @Body() authorData: UpdateAuthorDTO) {
    return this.authorService.updateOne(id, authorData);
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: number) {
    return this.authorService.deleteOne(id);
  }
}
