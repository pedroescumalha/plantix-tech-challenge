import z from "zod";

export const MAX_LIMIT = 100;

export const paginationQuerySchema = z.object({
    limit: z
        .string()
        .optional()
        .transform((value) => value ? Number(value) : MAX_LIMIT)
        .refine(
            (value) => value <= MAX_LIMIT && value > 0,
            `should be in a range from 1 to ${MAX_LIMIT}`,
        ),
    offset: z
        .string()
        .optional()
        .transform((value) => value ? Number(value) : 0),
});

export function createPaginationResponseSchema<T extends z.ZodTypeAny>(dataSchema: T): z.ZodObject<{
    limit: z.ZodNumber;
    offset: z.ZodNumber;
    total: z.ZodNumber;
    data: z.ZodArray<T>;
}> {
    return z
        .object({
            limit: z.number(),
            offset: z.number(),
            total: z.number(),
            data: z.array(dataSchema),
        })
        .strict();
}
