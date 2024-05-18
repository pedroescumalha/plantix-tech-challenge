import { buildServer } from "./api";
import { initDb } from "./services";

const db = initDb();
const server = buildServer();

server.start(async () => {
    await db.disconnect();
});
