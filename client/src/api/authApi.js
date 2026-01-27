import { useEffect, useRef } from "react";
import request from "../utils/requester.js";

const baseUrl = 'http://localhost:3030/auth';

export const useLogin = () => {
    const abortRef = useRef(new AbortController())

    const login = async (email, password) => {
        const result = await request.post(`${baseUrl}/login`, {
            email,
            password
        }, { signal: abortRef.current.signal })

        return result
    }

    useEffect(() => {
        const abortController = abortRef.current;

        return () => abortController.abort();
    }, [])

    return {
        login
    }
}

export const useRegister = () => {
    const abortRef = useRef(new AbortController())

    const register = (email, password) =>
        request.post(`${baseUrl}/register`, { email, password }, { signal: abortRef.current.signal })

    useEffect(() => {
        const abortController = abortRef.current;

        return () => abortController.abort()
    }, [])

    return {
        register
    }
}