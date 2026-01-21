import { Router } from "express";
import { getAll, getKey, setNewValue } from "../services/settingsService.js";
import { validateBody } from "../middlewares/validateBody.js";
import { settingsSchema } from "../validators/settingsSchema.js";

const settingsController = Router();

settingsController.get('/', async (req, res) => {
    try {
        const settings = await getAll()

        return res.status(200).json(settings)
    } catch (error) {
        console.log(error.message);
        
        if (error.status) {
            return res.status(error.status).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

settingsController.put('/:key', validateBody(settingsSchema), async (req, res) => {
    const key = req.params.key;
    const { value } = req.body;

    try {
        const updated = await setNewValue(key, value)

        return res.status(200).json({ key: updated.key, value: updated.value })
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message })
        }

        return res.status(500).json({ error: "Internal Server Error" })
    }
})

settingsController.get('/:key', async (req, res) => {
    const key = req.params.key;

    try {
        const value = await getKey(key)

        return res.status(200).json({ key, value })
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default settingsController;