import { PrismaClient } from "@prisma/client";

type InitDbOutput = {
    disconnect: () => Promise<void>;
}

let dbClient: PrismaClient | undefined = undefined;

export function initDb(): InitDbOutput {
    const db = getInstance();

    return {
        disconnect: db.$disconnect,
    };
}

export function getInstance(): PrismaClient {
    if (!dbClient) {
        dbClient = new PrismaClient();
    }

    return dbClient;
}
