import { Router } from "express";
import { getCurrentRate } from "../services/exchangeRateService.js";

const rateController = Router();

rateController.get('/current', async (req, res) => {
    const { asOf } = req.query;

    const effectiveDate = asOf ? new Date(asOf) : new Date();

    if (Number.isNaN(effectiveDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format.' });
    }

    try {
        const { rateBgnPerEur, validFrom } = await getCurrentRate(effectiveDate)

        return res.status(200).json({ rateBgnPerEur, validFrom });
    } catch (error) {
        if (error.code === 'EXCHANGE_RATE_NOT_FOUND') {
            return res.status(404).json({ error: 'Exchange rate not found for the specified date.' });
        }

        return res.status(500).json({ error: error.message });
    }
})

export default rateController;