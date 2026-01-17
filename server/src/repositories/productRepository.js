import prisma from "../prisma.js";

export async function findMany({ categoryId, limit = 10, offset = 0  } = {}) {
    return await prisma.product.findMany({
        where: categoryId ? { categoryId } : undefined,
        orderBy: { name: 'asc' },
        include: { category: true, prices: { orderBy: { effectiveFrom: 'desc' }, take: 1 } },
        take: limit,
        skip: offset,
    })
}

export async function create({ name, categoryId, unit }) {
    return await prisma.product.create({
        data: { name, categoryId, unit },
        include: { category: true, prices: { orderBy: { effectiveFrom: 'desc' }, take: 1 } },
    })
}

export async function findById(id) {
    return await prisma.product.findUnique({
        where: { id },
        include: { category: true, prices: { orderBy: { effectiveFrom: 'desc' }, take: 1 } },
    })
}