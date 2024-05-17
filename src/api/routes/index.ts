import { createSensorDataRoute } from "./createSensorDataRoute";
import { getAllSensorsDataRoute } from "./getAllSensorsDataRoute";
import { healthCheckRoute } from "./healthCheckRoute";

export const routes = [
    healthCheckRoute,
    getAllSensorsDataRoute,
    createSensorDataRoute,
];
