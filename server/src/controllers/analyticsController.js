import { Router } from "express";
import { categoryInflationSchema, productSpikesSchema, roundingIncreaseSchema } from "../validators/analyticsSchema.js";
import { categoryInflationService, productSpikesService, roundingVersusRealIncrease } from "../services/analyticsService.js";

const analyticsController = Router();

function zodErrorToResponse(error) {
    const issues = error.issues ?? error.errors ?? [];

    return {
        errors: issues.map((e) => ({
            field: Array.isArray(e.path) ? e.path.join('.') : String(e.path || ''),
            message: e.message,
        }))
    }
}

analyticsController.get('/products/:id/spikes', async (req, res) => {
    const mergeParamsQuery = { ...req.query, ...req.params }

    const result = productSpikesSchema.safeParse(mergeParamsQuery)

    if (!result.success) {
        return res.status(400).json(zodErrorToResponse(result.error))
    }

    try {
        const {id, from, to, threshold } = result.data

        const spikes = await productSpikesService(id, from, to, threshold)

        return res.status(200).json({
            productId: id,
            thresholdPct: threshold,
            spikes,
        })
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

analyticsController.get('/categories/:id/inflation', async (req, res) => {
    const merged = { ...req.query, ...req.params }

    const result = categoryInflationSchema.safeParse(merged)

    if (!result.success) {
        return res.status(400).json(zodErrorToResponse(result.error))
    }

    try {
        const { id, periodAStart, periodAEnd, periodBStart, periodBEnd } = result.data

        const payload = await categoryInflationService(id, periodAStart, periodAEnd, periodBStart, periodBEnd)

        return res.status(200).json(payload)
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

analyticsController.get('/summary', async (req, res) => {
    const merged = { ...req.query, ...req.params }

    const result = roundingIncreaseSchema.safeParse(merged)

    if (!result.success) {
        return res.status(400).json(zodErrorToResponse(result.error))
    }

    try {
        const { periodAStart, periodAEnd, periodBStart, periodBEnd } = result.data

        const payload = await roundingVersusRealIncrease(periodAStart, periodAEnd, periodBStart, periodBEnd)

        return res.status(200).json(payload)
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default analyticsController;