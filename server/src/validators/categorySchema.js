import {z} from "zod";

export const categorySchema = z.object({
    name: z.string().trim().nonempty('Category name is required').max(100, 'Category name must be at most 100 characters long'),
})