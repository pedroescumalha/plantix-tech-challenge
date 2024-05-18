import * as repositories from "../repositories";

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

export const getSensorData = repositories.getSensorData;

export async function createSensorData(input: SensorDataInput): Promise<SensorDataOutput> {
    const res = await repositories.createSensorData({
        unit: input.unit,
        type: input.type,
        timestamp: BigInt(Math.floor(input.timestamp.getTime() / 1000)),
        value: input.value,
        latitude: input.latitude,
        longitude: input.longitude,
        externalId: input.externalId,
    });

    return {
        id: res.id,
        externalId: res.externalId,
        longitude: res.longitude,
        latitude: res.latitude,
        value: res.value,
        timestamp: new Date(Number(res.timestamp)),
        createdAt: new Date(Number(res.createdAt)),
        updatedAt: new Date(Number(res.updatedAt)),
        type: res.type as typeof input.type,
        unit: res.unit as typeof input.unit,
    };
}
