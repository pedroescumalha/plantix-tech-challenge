import { Prisma } from "@prisma/client";
import type { PaginatedInput, PaginatedOutput } from "../common/types";
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

export async function getSensorData(
    input: PaginatedInput
): Promise<PaginatedOutput<SensorDataOutput>> {
    const totalAsync = countSensorData();

    const res = await getInstance().sensorData.findMany({
        skip: input.skip,
        take: input.take,
        orderBy: {
            updatedAt: Prisma.SortOrder.desc,
        },
    });

    const total = await totalAsync;

    return {
        data: res,
        take: input.take,
        skip: input.skip,
        total,
    };
}

function countSensorData(): Promise<number> {
    return getInstance().sensorData.count();
}
