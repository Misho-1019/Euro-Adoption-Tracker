import { create, findAll } from "../repositories/categoryRepository.js";

export async function listCategories() {
    const categories = await findAll();

    return categories;
}

export async function createCategory(name) {
    try {
        const category = await create({ name })

        return category;
    } catch (error) {
        if (error.code === 'P2002') {
            throw new Error('CATEGORY_NAME_CONFLICT');
        }

        throw error;
    }
}
