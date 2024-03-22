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
    ) { }

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

        // author.tweets = author.tweets.filter(i => {
        //     new mongoose.Types.ObjectId(i) !== deletedTweet._id
        // })

        return deletedTweet
    }

    async addLikeToTweet(dto: LikeTweetDTO) {

        const tweetID = new mongoose.Types.ObjectId(dto.tweetID);
        const senderID = new mongoose.Types.ObjectId(dto.senderID);

        const tweet = await this.tweetModel.findById(tweetID);
        const sender = await this.userModel.findById(senderID);

        tweet.likes = tweet.likes + 1
        tweet.peopleWhoLiked.push(sender);
        sender.likedTweets.push(tweet)

        await tweet.save()  
        await sender.save()

        return tweet

    }

}
