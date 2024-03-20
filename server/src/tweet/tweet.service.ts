import { Injectable } from '@nestjs/common';
import { CreateTweetDTO, FindTweetsDTO, LikeTweetDTO } from './dto/tweet.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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

    async deleteTweetByID(id: string) {
        const objID = new mongoose.Types.ObjectId(id)
        const deletedTweet = await this.tweetModel.findByIdAndDelete(objID)
        return deletedTweet
    }

    async addLikeToTweet(dto: LikeTweetDTO) {
        // const tweet = await this.tweetModel.findById(dto.tweetID);
        // const sender = await this.userModel.findById(dto.senderID);

        // tweet.likes += 1;
        // tweet.peopleWhoLiked.push(dto.senderID);
        
        // tweet.peopleWhoLiked.push(sender.id)
        // sender.likedPosts.push(tweet._id)

        return tweet

    }

}
