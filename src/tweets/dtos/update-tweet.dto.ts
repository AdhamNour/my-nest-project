import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateTweetDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    text?: string;
}