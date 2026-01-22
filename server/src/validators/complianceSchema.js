import {z} from "zod";

export const complianceSchema = z.object({
    productId: z.coerce.number().int().positive(),
    displayedBgn: z.string().trim().nonempty().refine((v) => Number(v) > 0, { message: "displayedBgn must be greater than 0" }),
    displayedEur: z.string().trim().nonempty().refine((v) => Number(v) > 0, { message: "displayedEur must be greater than 0"}).optional()
})