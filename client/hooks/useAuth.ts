import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import Cookies from "js-cookie"

export interface userStoreType {
    _id: string
    username: string
    role?: "user" | "moderator" | "admin"
    avatar: string
}

interface userStore {
    user?: userStoreType
    isLogged: boolean
    setUser: (currentUser: userStoreType, token: string) => void
    logOut: () => void
}

const useAuth = create<userStore>()(
    persist(
        (set) => ({
            user: undefined,
            isLogged: false,

            setUser: (payload, token) => {
                Cookies.set("access_token", token)
                set({ isLogged: true, user: payload })
            },

            logOut: () => {
                Cookies.remove("access_token")
                set({ isLogged: false, user: undefined })
            }
        }),
        {
            name: "user",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export default useAuth