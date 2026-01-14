import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || 'BASIC_SECRET';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth']

    if (!token) return next();

    try {
        const decodedToken = jwt.verify(token, SECRET)

        req.user = decodedToken;
        res.locals.user = decodedToken;

        next();
    } catch (error) {
        res.clearCookie('auth')

        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

export const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
}

export const isGuest = (req, res, next) => {
    if (req.user) {
        return res.status(400).json({ error: 'You are already logged in' });
    }

    next();
}