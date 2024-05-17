import z from "zod";
import { createPaginationResponseSchema, paginationQuerySchema } from "./paginationSchema";

export const sensorsDataSchema = z.object({
    externalId: z.string(),
    type: z.string(),
    value: z.string(),
    timestamp: z.number().int(),
});

export const getAllSensorsDataResponseSchema = createPaginationResponseSchema(sensorsDataSchema);
export const getAllSensorsDataQueryStringSchema = paginationQuerySchema;
