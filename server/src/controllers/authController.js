import { Router } from "express";
import authService from "../services/authService.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/validateBody.js";
import { loginSchema, registerSchema } from "../validators/authSchema.js";

const authController = Router();

authController.post('/register', isGuest, validateBody(registerSchema), async (req, res) => {
    const authData = req.body;

    try {
        const token = await authService.register(authData)

        res.cookie('auth', token, { httpOnly: true })

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

authController.post('/login', isGuest, validateBody(loginSchema), async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password)

        res.cookie('auth', token, { httpOnly: true })

        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
})

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth')

    return res.status(200).json({ message: 'Logged out successfully' });
})

export default authController;