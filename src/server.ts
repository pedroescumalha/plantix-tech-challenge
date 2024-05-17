import fastify from "fastify";

type Server = {
    start: () => void;
};

export function buildServer(): Server {
    const server = fastify();

    const startServer = (): void => {
        server.listen({ port: 8080 }, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            console.log(`Server listening at ${address}`);
        });
    };

    return { start: startServer };
}
