import { Router } from "express";
import { createCategory, listCategories } from "../services/categoryService.js";
import { validateBody } from "../middlewares/validateBody.js";
import { categorySchema } from "../validators/categorySchema.js";

const categoriesController = Router();

categoriesController.get('/', async (req, res) => {
    try {
        const categories = await listCategories();

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

categoriesController.post('/',validateBody(categorySchema), async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = await createCategory(name)

        return res.status(201).json(newCategory)
    } catch (error) {
        if (error.message === 'CATEGORY_NAME_CONFLICT') {
            return res.status(409).json({ error: 'Category name already exists' });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default categoriesController;