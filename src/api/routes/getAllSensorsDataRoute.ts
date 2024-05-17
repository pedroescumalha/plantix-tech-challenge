import type { FastifyInstance } from "fastify";
import { endpointsV1 } from "./endpoints";
import type z from "zod";
import {
    type getAllSensorsDataResponseSchema,
    getAllSensorsDataQueryStringSchema,
} from "./sensorsDataSchema";

type QueryString = z.infer<typeof getAllSensorsDataQueryStringSchema>;
type Response = z.infer<typeof getAllSensorsDataResponseSchema>;

export function getAllSensorsDataRoute(server: FastifyInstance): Promise<void> {
    server.get<{ Querystring: QueryString, Reply: Response }>(
        endpointsV1.getAllSensorsData,
        {
            schema: {
                querystring: getAllSensorsDataQueryStringSchema,
            },
        },
        (_, reply) => {
            reply
                .code(200)
                .send({
                    limit: 0,
                    total: 0,
                    offset: 0,
                    data: [{
                        externalId: "",
                        type: "",
                        value: "",
                        timestamp: 0,
                    }],
                });
        }
    );
    
    return Promise.resolve();
}
