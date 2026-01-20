import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { basketQuoteSchema } from "../validators/basketQuoteSchema.js";
import { basketService } from "../services/basketService.js";

const basketController = Router();

basketController.post('/quote', validateBody(basketQuoteSchema), async (req, res, next) => {
    const { items } = req.body;

    try {
        const result = await basketService(items)

        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

export default basketController;