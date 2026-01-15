import { Prisma } from "@prisma/client";

export function normalizeDecimal(input) {
    if (input === null || input === undefined) {
        throw new Error('Invalid decimal input');
    }

    if (input instanceof Prisma.Decimal) {
        return input;
    }

    if (typeof input === "number") {
        if (!Number.isFinite(input)) {
            throw new Error('Invalid decimal input');
        }

        return new Prisma.Decimal(input);
    }

    if (typeof input === 'string') {
        const trimmedInput = input.trim();

        if (trimmedInput === '') {
            throw new Error('Invalid decimal input');
        }

        try {
            return new Prisma.Decimal(trimmedInput)
        } catch (error) {
            throw new Error('Invalid decimal input');
        }
    }

    throw new Error('Invalid decimal input');
}

export function convertBgnToEurExact(priceBgn, rateBgnPerEur) {
    const priceBgnDecimal = normalizeDecimal(priceBgn)
    const rateBgnPerEurDecimal = normalizeDecimal(rateBgnPerEur)

    if (priceBgnDecimal.lte(0)) {
        throw new Error('Invalid priceBgn');
    }

    if (rateBgnPerEurDecimal.isZero() || rateBgnPerEurDecimal.isNeg()) {
        throw new Error('Invalid rateBgnPerEur');
    }

    const priceEur = priceBgnDecimal.div(rateBgnPerEurDecimal)
    
    return priceEur;
}

export function roundEur(eurExact, policy = 'HALF_UP') {
    const eurExactDecimal = normalizeDecimal(eurExact)

    if (policy !== 'HALF_UP') {
        throw new Error(`Unsupported rounding policy: ${policy}`);
    }

    return eurExactDecimal.toDecimalPlaces(
        2,
        Prisma.Decimal.ROUND_HALF_UP,
    )
}