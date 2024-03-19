import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TweetDTO } from './dto/tweet.dto';

@Controller('tweet')
export class TweetController {

    @Post("/")
    createTweet(@Body() dto: TweetDTO) {
        return dto
    }

    @Get("/")
    getTweets(@Query('author') author: string) {
        return author
    }

}
