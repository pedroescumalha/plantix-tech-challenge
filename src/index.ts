import { buildServer } from "./api";
import { init } from "./repositories";

const db = init();
const server = buildServer((options) => {
    options.onDisconnect = async (log): Promise<void> => {
        await db.disconnect();
        log("database disconnected");
    };
});
server.start();
