import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { complianceSchema } from "../validators/complianceSchema.js";
import { checkPriceTag } from "../services/complianceService.js";

const complianceController = Router();

complianceController.post('/check', validateBody(complianceSchema), async (req, res) => {
    const { productId, displayedBgn, displayedEur } = req.body;

    try {
        const result = await checkPriceTag({productId, displayedBgn, displayedEur})

        return res.status(200).json(result)
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message })
        }

        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default complianceController;