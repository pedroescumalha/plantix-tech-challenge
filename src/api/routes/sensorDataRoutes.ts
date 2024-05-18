import type { FastifyInstance } from "fastify";
import { endpointsV1 } from "./endpoints";
import z from "zod";
import { createPaginationResponseSchema, paginationQuerySchema } from "./paginationSchema";
import {
    HumidityUnit,
    LightUnit,
    PressureUnit,
    SensorType,
    TemperatureUnit,
    createSensorData,
    getSensorData,
} from "../../services";

export const sensorsDataSchema = z.object({
    externalId: z.string(),
    value: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    timestamp: z.string().datetime().transform((date) => new Date(date)),
    type: z.nativeEnum(SensorType),
    unit: z.union([
        z.nativeEnum(LightUnit),
        z.nativeEnum(HumidityUnit),
        z.nativeEnum(PressureUnit),
        z.nativeEnum(TemperatureUnit),
    ]),
});

export const getAllSensorsDataResponseSchema = createPaginationResponseSchema(sensorsDataSchema);
export const getAllSensorsDataQueryStringSchema = paginationQuerySchema;

export function createSensorDataRoute(server: FastifyInstance): Promise<void> {
    server.post<{ Body: z.infer<typeof sensorsDataSchema> }>(
        endpointsV1.createSensorData,
        {
            schema: {
                body: sensorsDataSchema,
            },
        },
        async (request, reply) => {
            await createSensorData(request.body);
            reply.code(201).send({});
        }
    );

    return Promise.resolve();
}

export function getAllSensorsDataRoute(server: FastifyInstance): Promise<void> {
    server.get<{
        Querystring: z.infer<typeof getAllSensorsDataQueryStringSchema>;
        Reply: z.infer<typeof getAllSensorsDataResponseSchema>;
    }>(
        endpointsV1.getAllSensorsData,
        {
            schema: {
                querystring: getAllSensorsDataQueryStringSchema,
            },
        },
        async (request, reply) => {
            const res = await getSensorData({
                skip: request.query.skip,
                take: request.query.take,

            });

            reply.code(200).send(res);
        }
    );

    return Promise.resolve();
}
