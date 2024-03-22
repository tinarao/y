import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTweetDTO, FindTweetsDTO, LikeTweetDTO } from './dto/tweet.dto';
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

    @Delete("/delete/:id")
    deleteTweetByID(@Param() id: string) {
        return this.tweetService.deleteTweetByID(id)
    }

    @Post("/like/:tweetID/:senderID")
    likeTweet(@Param() dto: LikeTweetDTO) {
        return this.tweetService.addLikeToTweet(dto)
    }

}
