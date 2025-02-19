import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './tweets.entity';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { UpdateTweetDto } from './dtos/update-tweet.dto';

@Injectable()
export class TweetsService {
    constructor(
        @InjectRepository(Tweet)
        private tweetsRepository: Repository<Tweet>,
    ) {}

    async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
        const tweet = this.tweetsRepository.create(createTweetDto);
        return await this.tweetsRepository.save(tweet);
    }

    async findAll(): Promise<Tweet[]> {
        return this.tweetsRepository.find();
    }

    async findOne(id: number): Promise<Tweet> {
        return this.tweetsRepository.findOne({ where: { id } });
    }
    async update(id: number, updateTweetDto: UpdateTweetDto): Promise<Tweet> {
        await this.tweetsRepository.update(id, updateTweetDto);
        return this.tweetsRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.tweetsRepository.delete(id);
    }
}
