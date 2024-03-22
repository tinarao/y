export const config = {
    api: {
        auth: {
            register: "http://localhost:4000/api/v1/auth/register",
            login: "http://localhost:4000/api/v1/auth/login",
        },
        user: {
            getProfileInfoByID: "http://localhost:4000/api/v1/user/"
        },
        tweet: {
            create: "http://localhost:4000/api/v1/tweet",
            delete: "http://localhost:4000/api/v1/tweet/delete",
            like: "http://localhost:4000/api/v1/tweet/like",
        }
    }
}