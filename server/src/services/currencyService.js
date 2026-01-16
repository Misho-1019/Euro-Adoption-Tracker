import { convertBgnToEurExact, roundEur } from "../utils/money.js";

export function convertAndRound(priceBgn, rateBgnPerEur, policy = 'HALF_UP') {
    const eurExact = convertBgnToEurExact(priceBgn, rateBgnPerEur)

    const eurDisplay = roundEur(eurExact, policy)

    return { eurExact, eurDisplay };
}