import { Injectable } from '@nestjs/common';
import { CreateTweetDTO, FindTweetsDTO } from './dto/tweet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tweet } from './schema/tweet.schema';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class TweetService {

    constructor(
        @InjectModel("tweets") private tweetModel: Model<Tweet>,
        @InjectModel("users") private userModel: Model<User>
        ) {}

    async createTweet(dto: CreateTweetDTO) {
        const tweet = await this.tweetModel.create({ ...dto })
        const author = await this.userModel.findById(dto.author)

        author.tweets.push(tweet)
        await author.save()

        return author.tweets
    }

    async getTweetsByAuthorID(dto: FindTweetsDTO) {
        const tweets = await this.tweetModel.find({ author: dto.author })
        return tweets
    }

}
