import {z} from "zod";

export const settingsSchema = z.object({
    value: z.string().trim().min(1, 'Value is required')
})