import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { UpdateTweetDto } from './dtos/update-tweet.dto';

@Controller('tweets')
export class TweetsController {
    constructor(private readonly tweetsService: TweetsService) {}

    @Post()
    create(@Body() createTweetDto: CreateTweetDto) {
        return this.tweetsService.create(createTweetDto);
    }

    @Get()
    findAll() {
        return this.tweetsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.tweetsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateTweetDto: UpdateTweetDto) {
        return this.tweetsService.update(id, updateTweetDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.tweetsService.remove(id);
    }
}
