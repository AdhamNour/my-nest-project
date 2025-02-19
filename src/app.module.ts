import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';
import { AuthorModule } from './author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';

@Module({
  imports: [
    TweetsModule,
    AuthorModule,
    AppModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  providers: [AppService],
})
export class AppModule {}
