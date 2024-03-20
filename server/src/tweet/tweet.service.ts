import { Injectable } from '@nestjs/common';
import { CreateTweetDTO } from './dto/tweet.dto';

@Injectable()
export class TweetService {

    async createTweet(dto: CreateTweetDTO) {
        console.log(dto)
    }

}
