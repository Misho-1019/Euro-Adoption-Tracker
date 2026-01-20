import prisma from "../prisma.js";

export async function findAll() {
    return await prisma.appSetting.findMany({
        orderBy: { key }
    })
}

export async function findByKey(key) {
    const settingsKey = await prisma.appSetting.findUnique({
        where: { key }
    })

    return settingsKey
}

export async function upsert(key, value) {
    return await prisma.appSetting.upsert({
        where: { key },
        update: {
            value,
        },
        create: {
            key,
            value,
        }
    })
}