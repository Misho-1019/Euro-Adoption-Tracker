import { Router } from "express";
import authService from "../services/authService.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/validateBody.js";
import { loginSchema, registerSchema } from "../validators/authSchema.js";

const authController = Router();

authController.post('/register', isGuest, validateBody(registerSchema), async (req, res) => {
    const authData = req.body;

    try {
        const { accessToken, refreshToken } = await authService.register(authData)

        res.cookie('auth', accessToken, { httpOnly: true, sameSite: 'lax' })
        res.cookie('refresh', refreshToken, { httpOnly: true, sameSite: 'lax' })

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

authController.post('/login', isGuest, validateBody(loginSchema), async (req, res) => {
    const { email, password } = req.body;

    try {
        const { accessToken, refreshToken } = await authService.login(email, password)
        
        res.cookie('auth', accessToken, { httpOnly: true, sameSite: 'lax' })
        res.cookie('refresh', refreshToken, { httpOnly: true, sameSite: 'lax' })

        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
})

authController.get('/logout', isAuth, async (req, res) => {
    try {
        await authService.logout(req.cookies?.refresh)

        res.clearCookie('auth')
        res.clearCookie('refresh')

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

authController.post('/refresh', async (req, res) => {
    try {
        const { accessToken, refreshToken } = await authService.refresh(req.cookies?.refresh)

        res.cookie('auth', accessToken, { httpOnly: true, sameSite: 'lax' })
        res.cookie('refresh', refreshToken, { httpOnly: true, sameSite: 'lax' })

        return res.status(200).json({ message: 'Tokens refreshed successfully' });
    } catch (error) {
        res.clearCookie('auth')
        res.clearCookie('refresh')

        return res.status(400).json({ error: error.message })
    }
})

export default authController;