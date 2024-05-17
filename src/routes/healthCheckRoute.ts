import type { FastifyInstance } from "fastify";
import { endpointsV1 } from "./endpoints";

export function healthCheckRoute(server: FastifyInstance): Promise<void> {
    server.get(endpointsV1.healthCheck, (_, reply) => {
        reply.code(200).send({ status: "healthy" });
    });
    
    return Promise.resolve();
}
