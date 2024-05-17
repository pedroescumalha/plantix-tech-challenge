import z from "zod";

export const sensorsDataSchema = z.object({
    externalId: z.string(),
    type: z.string(),
    value: z.string(),
    timestamp: z.number().int(),
});
