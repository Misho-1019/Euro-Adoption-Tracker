import { Router } from "express";
import { createProduct, getProductById, listProducts } from "../services/productService.js";
import { validateBody } from "../middlewares/validateBody.js";
import { productSchema } from "../validators/productSchema.js";

const productsController = Router();

productsController.get('/', async (req, res) => {
    let { categoryId, limit, offset } = req.query;

    if (categoryId) {
        categoryId = Number(categoryId)

        if (isNaN(categoryId)) {
            return res.status(400).json({ error: 'Invalid categoryId' });
        }
    }

    if (limit !== undefined) {
        limit = Number(limit);
    
        if (Number.isNaN(limit)) {
            return res.status(400).json({ error: "Invalid limit" });
        }
    } else {
        limit = 10;
    }

    if (offset !== undefined) {
        offset = Number(offset);

        if (isNaN(offset) || offset < 0) {
            return res.status(400).json({ error: 'Invalid offset' });
        }
    } else {
        offset = 0;
    }

    try {
        const products = await listProducts({ categoryId, limit, offset })

        return res.status(200).json(products)
    } catch (error) {
        if (error.message === 'CATEGORY_NOT_FOUND') {
            return res.status(404).json({ error: 'Category not found' });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

productsController.post('/', validateBody(productSchema), async (req, res) => {
    const { name, unit, categoryId } = req.body;

    try {
        const newProduct = await createProduct({ name, unit, categoryId })

        return res.status(201).json(newProduct)
    } catch (error) {
        if (error.message === 'CATEGORY_NOT_FOUND') {
            return res.status(404).json({ error: 'Category not found' });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

productsController.get('/:id', async (req, res) => {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    try {
        const product = await getProductById(productId);

        return res.status(200).json(product)
    } catch (error) {
        if (error.message === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default productsController;