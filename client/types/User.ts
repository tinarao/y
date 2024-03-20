export interface User {
    _id: string
    __v?: number
    username: string
    role: string
    password?: string
    email: string
    avatar: string
    profileInfo?: string
    links: string[]
    fullName?: string
    subscribers? : User[]
    subscribedTo?: User[]
}