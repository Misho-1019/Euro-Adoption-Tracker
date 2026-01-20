import prisma from "../prisma.js";
import { getCurrentPricesForProducts } from "../repositories/productPriceRepository.js";
import { normalizeDecimal } from "../utils/money.js";

export async function basketService(items) {
    const qtyByProductId = new Map();

    for (const {productId, qty} of items) {
        const qtyDecimal = normalizeDecimal(qty);

        if (qtyByProductId.has(productId)) {
            const existingQty = qtyByProductId.get(productId)
            const newQty = existingQty.plus(qtyDecimal)

            qtyByProductId.set(productId, newQty)
        } else {
            qtyByProductId.set(productId, qtyDecimal)
        }
    }

    const productIds = Array.from(qtyByProductId.keys())

    const products = await prisma.product.findMany({
        where: { id: {
            in: productIds
        }},
        select: {
            id: true,
            name: true,
            unit: true,
        }
    })

    const productMap = new Map(products.map(p => [p.id, p]))

    const priceMap = await getCurrentPricesForProducts(productIds)

    const missingProductIds = productIds.filter(id => !productMap.has(id))
    
    if (missingProductIds.length > 0) {
        const err = new Error(`Missing products: ${missingProductIds.join(', ')}`)
        err.status = 404;
        throw err;
    }

    const missingPriceIds = productIds.filter(id => !priceMap.has(id))

    if (missingPriceIds.length > 0) {
        const err = new Error(`Missing prices: ${missingPriceIds.join(', ')}`)
        err.status = 400;
        throw err;
    }

    let totalBgn = normalizeDecimal(0);
    let totalEurExact = normalizeDecimal(0);
    let totalEurDisplay = normalizeDecimal(0);

    const itemsResult = [];

    for (const productId of productIds) {
        const qty = qtyByProductId.get(productId)
        const product = productMap.get(productId)
        const price = priceMap.get(productId)

        const lineBgn = price.priceBgn.times(qty);
        const lineEurExact = price.priceEurExact.times(qty);
        const lineEurDisplay = price.priceEurDisplay.times(qty);

        totalBgn = totalBgn.plus(lineBgn);
        totalEurExact = totalEurExact.plus(lineEurExact);
        totalEurDisplay = totalEurDisplay.plus(lineEurDisplay);

        itemsResult.push({
            productId: productId,
            name: product.name,
            unit: product.unit,
            qty: qty.toString(),
            unitPrice: {
                priceBgn: price.priceBgn.toFixed(2),
                priceEurExact: price.priceEurExact.toString(),
                priceEurDisplay: price.priceEurDisplay.toFixed(2),
                effectiveFrom: price.effectiveFrom,
            },
            lineTotal: {
                totalBgn: lineBgn.toFixed(2),
                totalEurExact: lineEurExact.toString(),
                totalEurDisplay: lineEurDisplay.toFixed(2),
            }
        })
    }

    const roundingImpact = totalEurDisplay.minus(totalEurExact)

    return {
        items: itemsResult,
        totals: {
            totalBgn: totalBgn.toFixed(2),
            totalEurDisplay: totalEurDisplay.toFixed(2),
            totalEurExact: totalEurExact.toString(),
            roundingImpact: roundingImpact.toString(),
        },
    }
}