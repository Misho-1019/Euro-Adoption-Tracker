import prisma from "../prisma.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export default {
    async register(authData) {
        const { email, password } = authData;

        const passwordHash = await bcrypt.hash(password, 10);

        let user;

        try {
            user = await prisma.user.create({
                data: {
                    email,
                    passwordHash,
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true,
                }
            })
        } catch (err) {
            if (err.code === 'P2002') {
                throw new Error('Email already in use');
            }
            
            throw err;
        }

        const payload = {
            id: user.id,
            email: user.email,
        }

        const token = jwt.sign(payload, SECRET, { expiresIn: '2h' })

        return token
    },
    async login(email, password) {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

        if (!isPasswordValid) {
            throw new Error('Invalid email or password')
        }

        const payload = {
            id: user.id,
            email: user.email,
        }

        const token = jwt.sign(payload, SECRET, { expiresIn: '2h' })

        return token;
    }
}