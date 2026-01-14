import prisma from "../prisma.js"
import bcrypt from "bcrypt";

export default {
    async register(authData) {
        const { email, password } = authData;

        const passwordHash = await bcrypt.hash(password, 10);

        return await prisma.user.create({
            data: {
                email,
                passwordHash,
            }
        })
    }
}