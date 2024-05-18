import { buildServer } from "./api";
import { init } from "./repositories";

const db = init();
const server = buildServer();

server.start(async () => {
    await db.disconnect();
});
