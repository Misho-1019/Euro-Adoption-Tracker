import { z } from "zod";

const emptyToUndefined = (v) => (v === '' || v === null ? undefined : v)

export const productSpikesSchema = z.object({
    id: z.coerce.number().int().positive(),
    threshold: z.preprocess(emptyToUndefined, z.coerce.number().min(0).max(500).default(20)),
    from: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
    to: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
}).superRefine(
    ({from, to}, ctx) => {
        if (from && to && from >= to) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "`from` must be strictly earlier than `to`",
                path: ['from']
            })
        }
    }
)

export const categoryInflationSchema = z.object({
    id: z.coerce.number().int().positive(),
    periodAStart: z.preprocess(emptyToUndefined, z.coerce.date()),
    periodAEnd: z.preprocess(emptyToUndefined, z.coerce.date()),
    periodBStart: z.preprocess(emptyToUndefined, z.coerce.date()),
    periodBEnd: z.preprocess(emptyToUndefined, z.coerce.date())
}).superRefine(
    ({periodAStart, periodAEnd, periodBStart, periodBEnd}, ctx) => {
        if (periodAStart >= periodAEnd) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "`periodAStart` must be strictly earlier than `periodAEnd`",
                path: ['periodAStart']
            })
        }

        if (periodBStart >= periodBEnd) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "`periodBStart` must be strictly earlier than `periodBEnd`",
                path: ['periodBStart']
            })
        }
    }
)

export const roundingIncreaseSchema = z.object({
    periodAStart: z.preprocess(emptyToUndefined, z.coerce.date()),
    periodAEnd: z.preprocess(emptyToUndefined, z.coerce.date()),
    periodBStart: z.preprocess(emptyToUndefined, z.coerce.date()),
    periodBEnd: z.preprocess(emptyToUndefined, z.coerce.date())
}).superRefine(
    ({periodAStart, periodAEnd, periodBStart, periodBEnd}, ctx) => {
        if (periodAStart >= periodAEnd) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "`periodAStart` must be strictly earlier than `periodAEnd`",
                path: ['periodAStart']
            })
        }

        if (periodBStart >= periodBEnd) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "`periodBStart` must be strictly earlier than `periodBEnd`",
                path: ['periodBStart']
            })
        }
    }
)