export interface Tweet {
    _id: string
    author: string
    text: string
    likes: number
    retweets: number
    peopleWhoLiked: string[]
    createdAt: Date
}