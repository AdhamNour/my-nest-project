import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Tweet } from './tweets.entity';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { UpdateTweetDto } from './dtos/update-tweet.dto';
import { Author } from 'src/author/author.entity';

@Injectable()
export class TweetsService {
    constructor(
        @InjectRepository(Tweet)
        private tweetsRepository: Repository<Tweet>,private dataSource: DataSource
    ) {}

    async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const tweet = this.tweetsRepository.create(createTweetDto);
            await queryRunner.manager.save(tweet);
            const authRepo = queryRunner.manager.getRepository(Author);
            const author = await authRepo.findOne({where: {id: createTweetDto.authorId}});
            author.latestUpdate=new Date();
            await queryRunner.manager.save(author);
            await queryRunner.commitTransaction();
            return tweet;
        }
        catch (err:any) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(err.message);
        }
        finally{
            await queryRunner.release();
        }
        // const tweet = this.tweetsRepository.create(createTweetDto);
        // return await this.tweetsRepository.save(tweet);
    }

    async findAll(): Promise<Tweet[]> {
        return this.tweetsRepository.find();
    }

    async findOne(id: number): Promise<Tweet> {
        return this.tweetsRepository.findOne({ where: { id } });
    }
    async update(id: number, updateTweetDto: UpdateTweetDto): Promise<Tweet> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.tweetsRepository.update(id, updateTweetDto);
            const tweet=await this.tweetsRepository.findOne({ where: { id } });
            const authRepo = queryRunner.manager.getRepository(Author);
            const author = await authRepo.findOne({where: {id: tweet.authorId}});
            author.latestUpdate=new Date();
            await queryRunner.manager.save(author);
            await queryRunner.commitTransaction();
            return tweet;
        } catch (error:any) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(error.message);
            
        } finally {
            await queryRunner.release();
        }
    }

    async remove(id: number): Promise<void> {
        await this.tweetsRepository.delete(id);
    }
}
