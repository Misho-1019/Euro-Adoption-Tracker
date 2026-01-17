import { findById as findCategoryById } from "../repositories/categoryRepository.js";
import { create, findMany, findById as findProductById } from "../repositories/productRepository.js";

async function ensureCategoryExists(categoryId) {
    const category = await findCategoryById(categoryId);
    if (!category) {
        throw new Error('CATEGORY_NOT_FOUND')
    }

    return category;
}

export async function listProducts({ categoryId, limit, offset } = {}) {
    if (categoryId !== undefined) {
        await ensureCategoryExists(categoryId)
    }

    const products = await findMany({ categoryId: categoryId, limit, offset });

    return products.map(product => {
        const latestPrice = product.prices[0] ?? null;

        const currentPrice = latestPrice ? {
            priceBgn: latestPrice.priceBgn,
            priceEurDisplay: latestPrice.priceEurDisplay,
            effectiveFrom: latestPrice.effectiveFrom,
        } : null;

        const categoryInfo = {
            id: product.category.id,
            name: product.category.name,
        }

        return {
            id: product.id,
            name: product.name,
            unit: product.unit,
            category: categoryInfo,
            currentPrice,
        }
    })
}

export async function createProduct({ name, categoryId, unit }) {
    const category = await ensureCategoryExists(categoryId)

    const product = await create({ name, categoryId: category.id, unit })

    return {
        id: product.id,
        name: product.name,
        unit: product.unit,
        category: {
            id: category.id,
            name: category.name,
        },
        currentPrice: product.prices[0] ? {
            priceBgn: product.prices[0].priceBgn,
            priceEurDisplay: product.prices[0].priceEurDisplay,
            effectiveFrom: product.prices[0].effectiveFrom, 
        } : null,
    }
}

export async function getProductById(id) {
    const product = await findProductById(id)

    if (!product) {
        throw new Error('PRODUCT_NOT_FOUND')
    }

    return {
        id: product.id,
        name: product.name,
        unit: product.unit,
        category: {
            id: product.category.id,
            name: product.category.name,
        },
        currentPrice: product.prices[0] ? {
            priceBgn: product.prices[0].priceBgn,
            priceEurDisplay: product.prices[0].priceEurDisplay,
            effectiveFrom: product.prices[0].effectiveFrom,
        } : null,
    }
}