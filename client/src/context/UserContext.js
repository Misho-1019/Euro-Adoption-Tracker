import { createContext } from "react";

export const UserContext = createContext({
    id: '',
    email: '',
    accessToken: '',
    userLoginHandler:() => null,
    userLogoutHandler: () => null
})