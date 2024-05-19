import type { FastifyReply, FastifyRequest } from "fastify";
import { ValidationError } from "../../common/errors";

type ErrorHandler = (error: Error, request: FastifyRequest, reply: FastifyReply) => void;
type HttpError = { statusCode: number, message: string };

const statusCodes = {
    [ValidationError.constructor.name]: 400,
    default: 500,
};

export const errorHandler: ErrorHandler = (error, _, reply) => {
    const httpError = getHttpError(error);
    reply.status(httpError.statusCode).send(httpError);
};

function getHttpError(error: Error): HttpError {
    let statusCode = statusCodes[error.constructor.name];
    
    if (!statusCode) {
        statusCode = statusCodes.default;
    }

    return { statusCode, message: error.message };
}

