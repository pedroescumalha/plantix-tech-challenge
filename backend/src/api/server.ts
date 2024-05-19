import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";
import { fastifyZodSchemaPlugin, errorHandler } from "./plugins";

type Server = {
    port: number;
    host: string;
    start: (onDisconnect?: () => Promise<void>) => void;
};

const serverOptions = {
    port: 8080,
    host: "localhost",
};

export function buildServer(
    configureServer?: (options: typeof serverOptions) => void
): Server {
    const server = fastify({ logger: true });
    
    if (configureServer) {
        configureServer(serverOptions);
    }

    server.register(fastifyZodSchemaPlugin);
    server.register(cors);

    server.setErrorHandler(errorHandler);

    routes.forEach((route) => {
        server.register(route);
    });

    return {
        host: serverOptions.host,
        port: serverOptions.port,
        start: (onDisconnect?: () => Promise<void>): void => {
            if (onDisconnect) {
                server.addHook("onClose", async () => {
                    await onDisconnect();
                    server.log.info("server disconnected.");
                });
            }

            server.listen({
                port: serverOptions.port,
                host: serverOptions.host,
            }, (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            });
        },
    };
}
