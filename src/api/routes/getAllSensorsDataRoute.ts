import type { FastifyInstance } from "fastify";
import { endpointsV1 } from "./endpoints";
import type z from "zod";
import { sensorsDataSchema } from "./sensorsDataSchema";
import { createPaginationResponseSchema, paginationQuerySchema } from "./paginationSchema";

const schema = createPaginationResponseSchema(sensorsDataSchema);

type QueryString = z.infer<typeof paginationQuerySchema>;
type Response = z.infer<typeof schema>;

export function getAllSensorsDataRoute(server: FastifyInstance): Promise<void> {
    server.get<{ Querystring: QueryString, Reply: Response }>(
        endpointsV1.getAllSensorsData,
        {
            schema: {
                querystring: paginationQuerySchema,
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
