import { axiosWithoutToken } from "./axios";

export const Auth = {
    login : async (data : any) => {
        const response = await axiosWithoutToken.post("/login", data)
        return response
    },
    signup : async (data : any) => {
        const response = await axiosWithoutToken.post("/register", data)
        return response
    },
}