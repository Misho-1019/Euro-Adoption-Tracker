import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || 'BASIC_SECRET';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth']

    if (!token) return next();

    try {
        const decodedToken = jwt.verify(token, SECRET)

        req.user = decodedToken;

        next();
    } catch (error) {
        res.clearCookie('auth')

        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}