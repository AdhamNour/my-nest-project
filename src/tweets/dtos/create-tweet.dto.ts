import { IsNumber, IsString } from "class-validator";

export class CreateTweetDto {
    @IsString()
    readonly text: string;
    @IsNumber()
    readonly authorId: number;
}