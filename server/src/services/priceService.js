import prisma from "../prisma.js";
import { createPrice, getCurrentPrice as getCurrentPriceRecord, getPriceHistory as getProductPriceHistory } from "../repositories/productPriceRepository.js";
import { convertAndRound } from "./currencyService.js";
import { getCurrentRate } from "./exchangeRateService.js";

async function ensureProductExists(productId) {
    const product = await prisma.product.findUnique({
        where: { id: productId }
    })

    if (!product) {
        throw new Error('PRODUCT_NOT_FOUND')
    }

    return product;
}

export async function setProductPrice(productId, priceBgn, effectiveFrom) {
    const product = await ensureProductExists(productId)
    const policy = 'HALF_UP';
    const effectiveAt = effectiveFrom ?? new Date()

    const { rateBgnPerEur } = await getCurrentRate(effectiveAt)

    const { eurExact, eurDisplay } = convertAndRound(priceBgn, rateBgnPerEur, policy)

    const priceRecord = await createPrice({
        productId: product.id,
        priceBgn,
        rateBgnPerEur,
        priceEurExact: eurExact,
        priceEurDisplay: eurDisplay,
        roundingPolicy: policy,
        effectiveFrom: effectiveAt,
    })

    return priceRecord;
}

export async function getCurrentPrice(productId, asOf = new Date()) {
    const product = await ensureProductExists(productId)

    const currentPrice = await getCurrentPriceRecord(product.id, asOf)

    if (currentPrice === null) {
        throw new Error('PRICE_NOT_FOUND')
    }

    return currentPrice;
}

export async function getPriceHistory(productId) {
    const product = await ensureProductExists(productId)

    const priceHistory = await getProductPriceHistory(product.id)

    return priceHistory;
}