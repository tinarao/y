import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTweetDTO, FindTweetsDTO } from './dto/tweet.dto';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {

    constructor(private tweetService: TweetService) {}

    @Post("/")
    createTweet(@Body() dto: CreateTweetDTO) {
        return this.tweetService.createTweet(dto)
    }

    @Get("/:author")
    getTweetsByAuthor(@Param() author: FindTweetsDTO) {
        return this.tweetService.getTweetsByAuthorID(author)
    }

}
