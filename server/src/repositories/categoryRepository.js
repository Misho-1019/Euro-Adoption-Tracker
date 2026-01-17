import prisma from "../prisma.js";

export async function findAll() {
    return await prisma.category.findMany({
        orderBy: { name: 'asc' },
    })
}

export async function create({ name }) {
    return await prisma.category.create({
        data: { name },
    })
}

export async function findById(id) {
    return await prisma.category.findUnique({
        where: { id },
    })
}