import { User } from "./User"

export interface Tweet {
    _id: string
    author: User | string
    text: string
    likes: number
    retweets: number
    peopleWhoLiked: string[]
    createdAt: Date
}