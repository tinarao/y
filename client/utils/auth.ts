import Cookies from "js-cookie"

export const getBearerHeader = () => {
    const token = Cookies.get("access_token");

    if (!token) {
        return {}
    }

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}