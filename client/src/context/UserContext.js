import { createContext } from "react";

export const UserContext = createContext({
    id: '',
    email: '',
    token: '',
    userLoginHandler:() => null
})