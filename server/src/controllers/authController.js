import { Router } from "express";
import authService from "../services/authService.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.post('/register', isGuest, async (req, res) => {
    const authData = req.body;

    try {
        await authService.register(authData)

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

authController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password)

        res.cookie('auth', token, { httpOnly: true })
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