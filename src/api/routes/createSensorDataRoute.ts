import type { FastifyInstance } from "fastify";
import { endpointsV1 } from "./endpoints";

export function createSensorDataRoute(server: FastifyInstance): Promise<void> {
    server.post(endpointsV1.createSensorData, (_, reply) => {
        reply.code(201).send({});
    });
    
    return Promise.resolve();
}
