import {z} from "zod";

export const basketQuoteSchema = z.object({
    items: z.array(
        z.object({
            productId: z.coerce.number().int().positive(),
            qty: z.coerce.number().positive().max(1000000)
        })
    ).min(1).max(100),
})