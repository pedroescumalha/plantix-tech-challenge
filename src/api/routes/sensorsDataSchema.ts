import z from "zod";
import { createPaginationResponseSchema, paginationQuerySchema } from "./paginationSchema";
import { HumidityUnit, LightUnit, PressureUnit, SensorType, TemperatureUnit } from "../../services";

export const sensorTypes = z.union([
    z.object({ type: z.literal(SensorType.LIGHT), unit: z.nativeEnum(LightUnit) }),
    z.object({ type: z.literal(SensorType.HUMIDITY), unit: z.nativeEnum(HumidityUnit) }),
    z.object({ type: z.literal(SensorType.PRESSURE), unit: z.nativeEnum(PressureUnit) }),
    z.object({ type: z.literal(SensorType.TEMPERATURE), unit: z.nativeEnum(TemperatureUnit) }),
]);

export const sensorsDataSchema = z.object({
    externalId: z.string(),
    value: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    timestamp: z.string().datetime().transform((date) => new Date(date)),
}).and(sensorTypes);

export const getAllSensorsDataResponseSchema = createPaginationResponseSchema(sensorsDataSchema);
export const getAllSensorsDataQueryStringSchema = paginationQuerySchema;
