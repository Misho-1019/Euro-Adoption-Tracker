import {  } from "../prisma.js";

export async function getCurrentRate(asOf = new Date()) {
    const now = asOf instanceof Date ? asOf : new Date();

    const rateRecord = await prisma.exchangeRate.findFirst({
        where: { validFrom: { lte: now } },
        orderBy: [{ validFrom: 'desc'}, { createdAt: 'desc' }, { id: 'desc' }]
    })

    if (!rateRecord) {
        const err = new Error('EXCHANGE_RATE_NOT_FOUND')
        err.code = 'EXCHANGE_RATE_NOT_FOUND'
        throw err;
    }

    return rateRecord;
}