import type { FastifyInstance } from "fastify";
import { endpointsV1 } from "./endpoints";

export function getAllSensorsDataRoute(server: FastifyInstance): Promise<void> {
    server.get(endpointsV1.getAllSensorsData, (_, reply) => {
        reply
            .code(200)
            .send({
                data: [{
                    externalId: "",
                    type: "",
                    value: "",
                    timestamp: 0,
                }],
            });
    });
    
    return Promise.resolve();
}
