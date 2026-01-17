import z from "zod";

export const productSchema = z.object({
    name: z.string().trim().nonempty('Product name is required').max(100, 'Product name must be at most 100 characters long'),
    unit: z.string().trim().nonempty('Unit is required').max(30, 'Unit must be at most 30 characters long'),
    categoryId: z.coerce.number().int().positive('Category ID must be a positive integer'),
})