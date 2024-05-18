import { createSensorDataRoute, getAllSensorsDataRoute } from "./sensorDataRoutes";
import { healthCheckRoute } from "./healthCheckRoute";

export const routes = [
    healthCheckRoute,
    getAllSensorsDataRoute,
    createSensorDataRoute,
];
