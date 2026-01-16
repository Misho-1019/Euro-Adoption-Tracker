import z from "zod";

export const priceBodySchema = z.object({
    priceBgn: z.union([
        z.number().positive(), 
        z.string().trim().regex(/^\d+(\.\d+)?$/, 'Must be a positive number').refine((val) => parseFloat(val) > 0, 'Must be a positive number')
    ]),
    effectiveFrom: z.string().datetime().optional()
})