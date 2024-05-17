import type { FastifyInstance } from "fastify";
import { endpointsV1 } from "./endpoints";
import type z from "zod";
import { sensorsDataSchema } from "./sensorsDataSchema";

type Request = z.infer<typeof sensorsDataSchema>;

export function createSensorDataRoute(server: FastifyInstance): Promise<void> {
    server.post<{ Body: Request }>(
        endpointsV1.createSensorData,
        {
            schema: {
                body: sensorsDataSchema,
            },
        },
        (_, reply) => {
            reply.code(201).send({});
        }
    );
    
    return Promise.resolve();
}
