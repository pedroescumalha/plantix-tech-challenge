import { Prisma } from "@prisma/client";
import type { PaginatedInput, PaginatedOutput } from "../common/types";
import { getInstance } from "./dbClient";

export enum SensorType {
    TEMPERATURE = "TEMPERATURE",
    HUMIDITY = "HUMIDITY",
    PRESSURE = "PRESSURE",
    LIGHT = "LIGHT",
}

export enum TemperatureUnit {
    CELSIUS = "ºC",
    FARENHEIT = "ºF",
    KELVIN = "K",
}

export enum HumidityUnit {
    ABSOLUTE = "g/kg",
    RELATIVE = "%",
}

export enum PressureUnit {
    PASCAL = "Pa",
    Bar = "bar",
}

export enum LightUnit {
    CANDLE = "cd",
    LUMEN = "lm",
    LUX = "lx",
    FOOTCANDLE = "fc",
}

type SensorDataInput = {
    externalId: string;
    value: number;
    latitude: number;
    longitude: number;
    timestamp: Date;
} & (
    { type: SensorType.TEMPERATURE, unit: TemperatureUnit } |
    { type: SensorType.LIGHT, unit: LightUnit } |
    { type: SensorType.HUMIDITY, unit: HumidityUnit } |
    { type: SensorType.PRESSURE, unit: PressureUnit }
);

type SensorDataOutput = SensorDataInput & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export async function getSensorData(
    input: PaginatedInput,
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

export async function createSensorData(input: SensorDataInput): Promise<SensorDataOutput> {
    const res = await getInstance().sensorData.create({
        data: {
            type: input.type,
            unit: input.unit,
            value: input.value,
            latitude: input.latitude,
            longitude: input.longitude,
            timestamp: input.timestamp,
            externalId: input.externalId,
        },
    });

    return {
        id: res.id,
        externalId: res.externalId,
        longitude: res.longitude,
        latitude: res.latitude,
        value: res.value,
        timestamp: res.timestamp,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
        type: res.type as typeof input.type,
        unit: res.unit as typeof input.unit,
    };
}
