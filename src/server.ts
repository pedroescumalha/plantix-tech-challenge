import fastify from "fastify";

type Server = {
    port: number;
    host: string;
    start: () => void;
};

const serverOptions = {
    port: 8080,
    host: "localhost",
};

export function buildServer(
    configureServer?: (options: typeof serverOptions) => void
): Server {
    const server = fastify();
    
    if (configureServer) {
        configureServer(serverOptions);
    }

    const start = (): void => {
        server.listen({
            port: serverOptions.port,
            host: serverOptions.host,
        }, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            console.log(`Server listening at ${address}`);
        });
    };

    return {
        host: serverOptions.host,
        port: serverOptions.port,
        start,
    };
}
