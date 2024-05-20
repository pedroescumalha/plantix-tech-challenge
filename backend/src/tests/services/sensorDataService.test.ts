import { describe, it } from "node:test";
import {
    createSensorData,
    HumidityUnit,
    LightUnit,
    PressureUnit,
    SensorType,
    TemperatureUnit,
} from "../../services";
import assert from "node:assert";
import { ValidationError } from "../../common/errors";

describe(createSensorData.name, () => {
    const wrongUnitTypes: {
        sensorType: SensorType;
        unitType: TemperatureUnit | HumidityUnit | LightUnit | PressureUnit;
    }[] = [
        { sensorType: SensorType.LIGHT, unitType: TemperatureUnit.KELVIN },
        { sensorType: SensorType.LIGHT, unitType: HumidityUnit.RELATIVE },
        { sensorType: SensorType.LIGHT, unitType: PressureUnit.PASCAL },
        { sensorType: SensorType.HUMIDITY, unitType: TemperatureUnit.KELVIN },
        { sensorType: SensorType.HUMIDITY, unitType: LightUnit.LUX },
        { sensorType: SensorType.HUMIDITY, unitType: PressureUnit.PASCAL },
        { sensorType: SensorType.PRESSURE, unitType: TemperatureUnit.KELVIN },
        { sensorType: SensorType.PRESSURE, unitType: LightUnit.LUX },
        { sensorType: SensorType.PRESSURE, unitType: HumidityUnit.RELATIVE },
        { sensorType: SensorType.TEMPERATURE, unitType: HumidityUnit.RELATIVE },
        { sensorType: SensorType.TEMPERATURE, unitType: LightUnit.LUX },
        { sensorType: SensorType.TEMPERATURE, unitType: PressureUnit.PASCAL },
    ];

    for (const types of wrongUnitTypes) {
        it(`throws if sensor type is ${types.sensorType} and unit ${types.unitType}`, async () => {
            const sensorData = {
                type: types.sensorType,
                unit: types.unitType,
                value: Math.ceil(Math.random() * 10),
                latitude: Math.ceil(Math.random() * 10),
                longitude: Math.ceil(Math.random() * 10),
                timestamp: new Date(),
                externalId: "sensor",
            };

            await assert.rejects(() => createSensorData(sensorData), ValidationError);
        });
    }

});
