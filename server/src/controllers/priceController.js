import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { priceBodySchema } from "../validators/priceSchema.js";
import { getCurrentPrice, getPriceHistory, setProductPrice } from "../services/priceService.js";

const priceController = Router();

priceController.put('/:id/price', validateBody(priceBodySchema), async (req, res) => {
    const productId = Number(req.params.id)
    const { priceBgn, effectiveFrom } = req.body;

    if (Number.isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID.' });
    }

    const effectiveDate = effectiveFrom ? new Date(effectiveFrom) : new Date()

    try {
        const priceRecord = await setProductPrice(productId, priceBgn, effectiveDate)

        return res.status(201).json(priceRecord);
    } catch (error) {
        if (error.message === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({ error: 'Product not found.' });
        }

        return res.status(500).json({ error: error.message })
    }
})

priceController.get('/:id/price', async (req, res) => {
    const productId = Number(req.params.id);

    if (Number.isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID.' });
    }

    try {
        const currentPrice = await getCurrentPrice(productId)

        return res.status(200).json(currentPrice)
    } catch (error) {
        if (error.message === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({ error: 'Product not found.' });
        } else if (error.message === 'PRICE_NOT_FOUND') {
            return res.status(404).json({ error: 'Price not found for the specified product.' });
        }

        return res.status(500).json({ error: error.message });
    }
})

priceController.get('/:id/prices', async (req, res) => {
    const productId = Number(req.params.id)

    if (Number.isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID.' });
    }

    try {
        const priceHistory = await getPriceHistory(productId)

        return res.status(200).json(priceHistory);
    } catch (error) {
        if (error.message === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({ error: 'Product not found.' });
        }

        return res.status(500).json({ error: error.message });
    }
})

export default priceController;