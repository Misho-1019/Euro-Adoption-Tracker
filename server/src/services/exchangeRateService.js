import { getCurrentRate } from "../repositories/exchangeRate.js";

export async function getCurrentRate(asOf = new Date()) {
    const { rateBgnPerEur, validFrom } = await getCurrentRate(asOf)

    return { rateBgnPerEur, validFrom };
}