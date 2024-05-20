import { Prisma } from "@prisma/client";
import type { PaginatedInput, PaginatedOutput } from "../common/types";
import { getInstance } from "./dbClient";
import { ValidationError } from "../common/errors";

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
    BAR = "bar",
}

export enum LightUnit {
    CANDLE = "cd",
    LUMEN = "lm",
    LUX = "lx",
    FOOTCANDLE = "fc",
}

type UnitType = TemperatureUnit | LightUnit | HumidityUnit | PressureUnit;

type SensorDataInput = {
    externalId: string;
    value: number;
    latitude: number;
    longitude: number;
    timestamp: Date;
    type: SensorType;
    unit: UnitType;
};

type SensorDataOutput = SensorDataInput & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

const allowedUnits: Record<SensorType, string[]> = {
    TEMPERATURE: Object.values(TemperatureUnit),
    PRESSURE: Object.values(PressureUnit),
    HUMIDITY: Object.values(HumidityUnit),
    LIGHT: Object.values(LightUnit),
};

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
        data: res.map((sensorData) => {
            return {
                id: sensorData.id,
                externalId: sensorData.externalId,
                longitude: sensorData.longitude,
                latitude: sensorData.latitude,
                value: sensorData.value,
                timestamp: sensorData.timestamp,
                createdAt: sensorData.createdAt,
                updatedAt: sensorData.updatedAt,
                type: sensorData.type as SensorType,
                unit: sensorData.unit as UnitType,
            };
        }),
        take: input.take,
        skip: input.skip,
        total,
    };
}

export async function createSensorData(input: SensorDataInput): Promise<SensorDataOutput> {
    if (!isUnitValid(input.type, input.unit)) {
        throw new ValidationError("Unit does not correspond to sensor type.");
    }

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

function isUnitValid(sensorType: SensorType, unit: string): boolean {
    return allowedUnits[sensorType].includes(unit);
}

function countSensorData(): Promise<number> {
    return getInstance().sensorData.count();
}
