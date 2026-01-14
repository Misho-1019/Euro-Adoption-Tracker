import prisma from "../prisma.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || 'BASIC_SECRET';

export default {
    async register(authData) {
        const { email, password } = authData;

        const userExists = await prisma.user.findUnique({
            where: { email }
        })

        if (userExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
            }
        })

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
            throw new Error("User not found");
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