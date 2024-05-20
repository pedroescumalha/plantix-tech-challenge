import { PaginatedInput, PaginatedOutput } from '../lib/types'

const url = 'http://localhost:8080/v1/sensors/data'

export enum SensorType {
  TEMPERATURE = 'TEMPERATURE',
  HUMIDITY = 'HUMIDITY',
  PRESSURE = 'PRESSURE',
  LIGHT = 'LIGHT',
}

export enum TemperatureUnit {
  CELSIUS = 'ºC',
  FARENHEIT = 'ºF',
  KELVIN = 'K',
}

export enum HumidityUnit {
  ABSOLUTE = 'g/kg',
  RELATIVE = '%',
}

export enum PressureUnit {
  PASCAL = 'Pa',
  BAR = 'bar',
}

export enum LightUnit {
  CANDLE = 'cd',
  LUMEN = 'lm',
  LUX = 'lx',
  FOOTCANDLE = 'fc',
}

type UnitType = TemperatureUnit | LightUnit | HumidityUnit | PressureUnit

export type SensorDataInput = {
  externalId: string;
  value: number;
  latitude: number;
  longitude: number;
  timestamp: string;
  type: SensorType;
  unit: UnitType;
}

type SensorDataOutput = SensorDataInput & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function getSensorData(input: PaginatedInput) {
  const res = await fetch(`${url}?take=${input.take}&skip=${input.skip}`, {
    method: 'GET'
  })

  return await res.json() as PaginatedOutput<SensorDataOutput>
}

export async function createSensorData(input: SensorDataInput) {
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(input),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
