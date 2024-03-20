export class CreateTweetDTO {
    readonly text;
    readonly author;
}

export class FindTweetsDTO {
    readonly author
}

export class DeleteTweetDTO {
    readonly reqSenderID;
    readonly tweetID;
}