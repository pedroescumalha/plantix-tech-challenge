import type { FastifyInstance } from "fastify";
import { endpointsV1 } from "./endpoints";

export function getSensorRoute(server: FastifyInstance): Promise<void> {
    server.get(endpointsV1.getSensor, (_, reply) => {
        reply
            .code(200)
            .send({
                externalId: "",
                type: "",
                value: "",
                timestamp: 0,
            });
    });
    
    return Promise.resolve();
}
