import prisma from "../prisma.js";

export async function productSpikes(productId, from, to, threshold = 20) {
    const mainWhere = {
        productId,
        ...( to && from ? { effectiveFrom: { gte: from, lt: to } } : {}),
    }


    const mainRows = await prisma.productPrice.findMany({
        where: mainWhere,
        orderBy: [{ effectiveFrom: 'asc' }, { createdAt: 'asc' }, { id: 'asc' }]
    })

    let extraRow = null;

    if (from) {
        extraRow = await prisma.productPrice.findFirst({
            where: {
                productId,
                ...(from ? { effectiveFrom: { lt: from } } : {})
            },
            orderBy: [{ effectiveFrom: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }]
        })
    }

    const rows = extraRow ? [extraRow, ...mainRows] : mainRows;

    return rows
}

export async function latestPricePerProduct(from, to, productIds) {
    const mainWhere = {
        effectiveFrom: { gte: from, lt: to },
        ...(productIds ? { productId: { in: productIds } } : {}),
    }

    const rows = await prisma.productPrice.findMany({
        where: mainWhere,
        orderBy: [{ effectiveFrom: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }]
    })

    return rows
}

export async function categoryInflation(categoryId) {
    const productIds = await prisma.product.findMany({
        where: { categoryId },
        select: {
            id: true,
            name: true,
        }
    })

    return productIds
}

export async function listProducts() {
    return await prisma.product.findMany({
        select: {
            id: true
        }
    })
}