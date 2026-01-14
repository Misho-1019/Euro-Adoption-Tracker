import prisma from "../prisma.js"

export default {
    async register(authData) {
        return await prisma.user.create({
            data: {
                authData,
            }
        })
    }
}