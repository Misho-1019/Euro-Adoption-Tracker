import prisma from "../prisma.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateRefreshToken, hashToken } from "../utils/tokens.js";

const SECRET = process.env.JWT_SECRET;
const ACCESS_EXPIRES_IN = '15m';
const REFRESH_DAYS = 7;

function requireSecret() {
    if (!SECRET) throw new Error('JWT_SECRET is not set');
}

function buildAccessToken(user) {
    requireSecret();

    const payload = {
        id: user.id,
        email: user.email,
    }

    return jwt.sign(payload, SECRET, { expiresIn: ACCESS_EXPIRES_IN })
}

function refreshExpiryDate() {
    const d = new Date()
    d.setDate(d.getDate() + REFRESH_DAYS)

    return d;
}

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

        const accessToken = buildAccessToken(user)

        const refreshToken = generateRefreshToken()
        const tokenHash = hashToken(refreshToken)

        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash,
                expiresAt: refreshExpiryDate(),
            },
        })

        return { accessToken, refreshToken }
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

        const accessToken = buildAccessToken(user);

        const refreshToken = generateRefreshToken()
        const tokenHash = hashToken(refreshToken)

        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash,
                expiresAt: refreshExpiryDate(),
            },
        })

        return { accessToken, refreshToken }
    },
    async logout(refreshToken) {
        if (!refreshToken) return;

        const tokenHash = hashToken(refreshToken)

        await prisma.refreshToken.updateMany({
            where: {
                tokenHash,
                revokedAt: null,
            },
            data: {
                revokedAt: new Date(),
            },
        })
    },
    async refresh(refreshToken) {
        if (!refreshToken) throw new Error('Missing refresh token');

        const oldHash = hashToken(refreshToken)

        const existing = await prisma.refreshToken.findFirst({
            where: {
                tokenHash: oldHash,
            },
            include: {
                user: true,
            }
        })

        if (!existing) throw new Error('Invalid refresh token');

        if (existing.revokedAt) throw new Error('Refresh token revoked');

        if (existing.expiresAt <= new Date()) throw new Error('Refresh token expired');

        const newRefreshToken = generateRefreshToken()
        const newHash = hashToken(newRefreshToken)

        await prisma.$transaction([
            prisma.refreshToken.update({
                where: {id: existing.id },
                data: {
                    revokedAt: new Date(),
                    replacedByTokenHash: newHash,
                }
            }),
            prisma.refreshToken.create({
                data: {
                    userId: existing.userId,
                    tokenHash: newHash,
                    expiresAt: refreshExpiryDate(),
                }
            })
        ])

        const accessToken = buildAccessToken(existing.user)

        return { accessToken, refreshToken: newRefreshToken }
    }
}