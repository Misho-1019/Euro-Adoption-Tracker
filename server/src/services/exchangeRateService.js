import { getCurrentRate as currentRate } from "../repositories/exchangeRate.js";

export async function getCurrentRate(asOf = new Date()) {
    const { rateBgnPerEur, validFrom } = await currentRate(asOf)

    return { rateBgnPerEur, validFrom };
}