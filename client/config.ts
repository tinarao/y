export const config = {
    api: {
        auth: {
            register: "http://localhost:4000/api/v1/auth/register",
            login: "http://localhost:4000/api/v1/auth/login",
        },
        user: {
            getProfileInfoByID: "http://localhost:4000/api/v1/user/info",
            editProfile: "http://localhost:4000/api/v1/user/edit",
            updateCover: "http://localhost:4000/api/v1/user/upd-cover",
            subscribe: "http://localhost:4000/api/v1/user/subscribe",
            unsubscribe: "http://localhost:4000/api/v1/user/unsubscribe",
        },
        tweet: {
            create: "http://localhost:4000/api/v1/tweet",
            delete: "http://localhost:4000/api/v1/tweet/delete",
            like: "http://localhost:4000/api/v1/tweet/like",
            removeLike: "http://localhost:4000/api/v1/tweet/removelike",
            getTweetsByFollowingAuthors: "http://localhost:4000/api/v1/tweet/following",
        }
    }
}