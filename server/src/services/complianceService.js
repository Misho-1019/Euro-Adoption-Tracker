import { Prisma } from "@prisma/client";
import { getCurrentRate } from "../repositories/exchangeRate.js";
import { findById } from "../repositories/productRepository.js";
import { convertBgnToEurExact, normalizeDecimal, roundEur } from "../utils/money.js";
import { getDualPricingConfig, getRoundingPolicy } from "./settingsService.js";

const ONE_CENT = new Prisma.Decimal('0.01')

function nowUtc() {
    return new Date();
}

function isWithingPeriodExclusive(dateNow, start, end) {
    if (!start || !end) return false;

    return dateNow >= start && dateNow <= end;
}

export async function checkPriceTag({ productId, displayedBgn, displayedEur }) {
    const product = await findById(productId)

    if (!product) {
        const err = new Error('Product not found')
        err.status = 404;
        throw err;
    }

    const exchangeRate = await getCurrentRate();

    const roundingPolicy = await getRoundingPolicy();
    const dualConfig = await getDualPricingConfig();

    const eurExact = convertBgnToEurExact(displayedBgn, exchangeRate.rateBgnPerEur)
    const eurDisplayDecimal = roundEur(eurExact, roundingPolicy);

    const expectedEur = eurDisplayDecimal.toFixed(2)

    const violations = [];

    if (
        dualConfig?.enabled === true &&
        dualConfig.start instanceof Date &&
        dualConfig.end instanceof Date &&
        isWithingPeriodExclusive(nowUtc(), dualConfig.start, dualConfig.end)
    ) {
        if (displayedEur === undefined || displayedEur === null || String(displayedEur).trim() === '') {
            violations.push({
                code: 'EUR_MISSING',
                message: 'EUR price is required during dual pricing period'
            })
        }
    }

    if (displayedEur !== undefined && displayedEur !== null && String(displayedEur).trim() !== '') {
        let displayedEurDecimal;

        try {
            displayedEurDecimal = normalizeDecimal(displayedEur)
        } catch (error) {
            const err = new Error('Malformed displayEur')
            err.status = 400;
            throw err;
        }

        const diff = displayedEurDecimal.sub(eurDisplayDecimal).abs();

        if (diff.gt(ONE_CENT)) {
            violations.push({
                code: 'EUR_MISMATCH',
                message: 'Displayed EUR price does not match expected conversion'
            })
        }
    }

    return {
        expectedEur,
        violations,
    }
}

// 1.5405
// 0.79