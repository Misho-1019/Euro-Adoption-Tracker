import request from "../utils/requester.js";

const baseUrl = 'http://localhost:3030/auth';

export const useLogin = () => {
    const login = async (email, password) => {
        const result = await request.post(`${baseUrl}/login`, {
            email,
            password
        })

        return result
    }

    return {
        login
    }
}