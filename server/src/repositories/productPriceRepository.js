import prisma from "../prisma.js";

export async function createPrice(data) {
    return await prisma.productPrice.create({
        data: {
            productId: data.productId,
            priceBgn: data.priceBgn,
            rateBgnPerEur: data.rateBgnPerEur,
            priceEurExact: data.priceEurExact,
            priceEurDisplay: data.priceEurDisplay,
            roundingPolicy: data.roundingPolicy,
            effectiveFrom: data.effectiveFrom,
        }
    })
}

export async function getCurrentPrice(productId, asOf = new Date()) {
    let asOfMoment;

    if (asOf instanceof Date) {
        asOfMoment = asOf;
    } else {
        asOfMoment = new Date(asOf)

        if (Number.isNaN(asOfMoment.getTime())) {
            throw new Error('Invalid asOf date')
        }
    }

    const priceRecord = await prisma.productPrice.findFirst({
        where: { productId, effectiveFrom: { lte: asOfMoment } },
        orderBy: [{ effectiveFrom: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }]
    })

    if (!priceRecord) {
        return null;
    }

    return priceRecord;
}

export async function getPriceHistory(productId) {
    return await prisma.productPrice.findMany({
        where: { productId },
        orderBy: [{ effectiveFrom: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }]
    })
}