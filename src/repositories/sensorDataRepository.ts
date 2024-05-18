import { getInstance } from "./dbClient";

export type SensorDataInput = {
    externalId: string;
    type: string;
    value: string;
    valueType: string;
    unit: string;
    latitude: number;
    longitude: number;
    timestamp: bigint;
}

export type SensorDataOutput = SensorDataInput & {
    id: number;
    createdAt: bigint;
    updatedAt: bigint;
}

export async function createSensorData(sensorData: SensorDataInput): Promise<SensorDataOutput> {
    const res = await getInstance().sensorData.create({
        data: {
            type: sensorData.type,
            unit: sensorData.unit,
            value: sensorData.value,
            latitude: sensorData.latitude,
            longitude: sensorData.longitude,
            timestamp: sensorData.timestamp,
            valueType: sensorData.valueType,
            externalId: sensorData.externalId,
        },
    });

    return res;
}
