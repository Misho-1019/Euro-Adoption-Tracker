import { categoryInflation, latestPricePerProduct, listProducts, productSpikes } from "../repositories/analyticsRepository.js";
import { findById } from "../repositories/productRepository.js";

export async function productSpikesService(productId, from, to, threshold = 20) {
    const rows = await productSpikes(productId, from, to, threshold)

    const enrichedRows = [];

    for (let i = 0; i < rows.length; i++) {
        const currentRow = rows[i];
        const previousRow = i > 0 ? rows[i - 1] : null;

        const currentPriceBgn = Number(currentRow.priceBgn);
        const previousPriceBgn = previousRow ? Number(previousRow.priceBgn) : null;

        const pctChangeBgn = previousPriceBgn !== null && previousPriceBgn !== 0 ? ((currentPriceBgn - previousPriceBgn) / previousPriceBgn) * 100 : null

        enrichedRows.push({
            effectiveFrom: currentRow.effectiveFrom,
            previousPriceBgn,
            currentPriceBgn,
            pctChangeBgn
        })
    }

    const spikeRows = enrichedRows.filter((row) => {
        if (row.pctChangeBgn === null) return false;

        if (Math.abs(row.pctChangeBgn) < threshold) return false;

        if (from && row.effectiveFrom < from) return false;
        if (to && row.effectiveFrom >= to) return false

        return true;
    })

    return spikeRows
}

export async function latestPricePerProductService(from, to, productIds) {
    const latestPrices = new Map();

    const rows = await latestPricePerProduct(from, to, productIds)

    for (const row of rows) {
        if (!latestPrices.has(row.productId)) {
            latestPrices.set(row.productId, row)
        }
    }

    return latestPrices
}

export async function categoryInflationService(categoryId, periodAStart, periodAEnd, periodBStart, periodBEnd) {
    const existingCategory = await findById(categoryId);

    if (!existingCategory) {
        const err = new Error('Category not found')
        err.status = 404;
        throw err;
    }

    const productIds = await categoryInflation(categoryId)

    let countCompared = 0;

    let sumExactPct = 0;
    let sumDisplayPct = 0;

    const pIds = productIds.map(p => p.id)

    const latestA = await latestPricePerProductService(periodAStart, periodAEnd, pIds)
    const latestB = await latestPricePerProductService(periodBStart, periodBEnd, pIds)

    for (const {id, name} of productIds) {
        const a = latestA.get(id)
        const b = latestB.get(id)

        if (!a || !b) continue;

        const aExact = Number(a.priceEurExact)
        const bExact = Number(b.priceEurExact)
        const aDisplay = Number(a.priceEurDisplay)
        const bDisplay = Number(b.priceEurDisplay)

        if (!Number.isFinite(aExact) || !Number.isFinite(bExact) || aExact === 0) continue;
        if (!Number.isFinite(aDisplay) || !Number.isFinite(bDisplay) || aDisplay === 0) continue;

        const exactPct = ((bExact - aExact) / aExact) * 100;
        const displayPct = ((bDisplay - aDisplay) / aDisplay) * 100;

        if (!Number.isFinite(exactPct) || !Number.isFinite(displayPct)) continue;

        sumExactPct += exactPct;
        sumDisplayPct += displayPct;
        countCompared++;
    }

    return {
        categoryId,
        periodA: {
            start: periodAStart,
            end: periodAEnd,
        },
        periodB: {
            start: periodBStart,
            end: periodBEnd,
        },
        countCompared,
        avgInflationExactPct: countCompared ? (sumExactPct / countCompared) : null,
        avgInflationDisplayPct: countCompared ? (sumDisplayPct / countCompared) : null,
    }
}

export async function roundingVersusRealIncrease(periodAStart, periodAEnd, periodBStart, periodBEnd) {
    const productIds = await listProducts();

    let countCompared = 0;
    let sumExactPct = 0;
    let sumDisplayPct = 0;
    let sumRoundingDeltaEur = 0;

    const pIds = productIds.map(p => p.id)

    const latestA = await latestPricePerProductService(periodAStart, periodAEnd, pIds)
    const latestB = await latestPricePerProductService(periodBStart, periodBEnd, pIds)

    for (const { id } of productIds) {
        const a = latestA.get(id)
        const b = latestB.get(id)

        if (!a || !b) continue;

        const aExactEur = Number(a.priceEurExact)
        const bExactEur = Number(b.priceEurExact)
        const aEurDisplay = Number(a.priceEurDisplay)
        const bEurDisplay = Number(b.priceEurDisplay)

        if (!Number.isFinite(aExactEur) || !Number.isFinite(bExactEur) || aExactEur === 0) continue;
        if (!Number.isFinite(aEurDisplay) || !Number.isFinite(bEurDisplay) || aEurDisplay === 0) continue;

        const exactChangePct = ((bExactEur - aExactEur) / aExactEur) * 100;
        const displayChangePct = ((bEurDisplay - aEurDisplay) / aEurDisplay) * 100;
        const roundingDeltaEur = (bEurDisplay - aEurDisplay) - (bExactEur - aExactEur)

        if (!Number.isFinite(exactChangePct) || !Number.isFinite(displayChangePct) || !Number.isFinite(roundingDeltaEur)) continue;

        sumExactPct += exactChangePct;
        sumDisplayPct += displayChangePct;
        sumRoundingDeltaEur += roundingDeltaEur;
        countCompared++;
    }

    return {
        countCompared,
        periodA: {
            start: periodAStart,
            end: periodAEnd,
        },
        periodB: {
            start: periodBStart,
            end: periodBEnd,
        },
        avgExactChangePct: countCompared ? (sumExactPct / countCompared).toFixed(2) : null,
        avgDisplayChangePct: countCompared ? (sumDisplayPct / countCompared).toFixed(2) : null,
        avgRoundingDeltaEur: countCompared ? (sumRoundingDeltaEur / countCompared).toFixed(2) : null
    }
}