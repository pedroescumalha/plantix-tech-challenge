import { useEffect, useState } from 'react'
import { Button } from './cn/button'
import { Input } from './cn/input'
import { Label } from './cn/label'
import { Popover, PopoverContent, PopoverTrigger } from './cn/popover'
import { HumidityUnit, LightUnit, PressureUnit, SensorDataInput, SensorType, TemperatureUnit } from '../lib/sensorsDataService'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './cn/select'

type SensorDataPopoverFormProps = {
  onSubmit: (sensorData: SensorDataInput) => void;
}

export default function SensorDataPopoverForm(props: SensorDataPopoverFormProps) {
  const [sensorData, setSensorData] = useState<Partial<SensorDataInput>>()

  const buildUnitSelector = () => {
    const sensorType = sensorData?.type

    if (!sensorType) {
      return <SelectItem value="dummy"></SelectItem>
    }

    const unitType =
      sensorType === SensorType.LIGHT ? LightUnit :
        sensorType === SensorType.HUMIDITY ? HumidityUnit :
          sensorType === SensorType.PRESSURE ? PressureUnit :
            TemperatureUnit

    return Object.values(unitType).map((t) => <SelectItem value={t}>{t}</SelectItem>)
  }

  useEffect(() => {
    console.log(sensorData)
  }, [sensorData])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default">Add Sensor</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sensor-name">Name</Label>
          <Input id="sensor-name" placeholder="Enter sensor name" onChange={(value) => setSensorData({ ...sensorData, externalId: value.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Type</Label>
          <Select onValueChange={(value) => setSensorData({ ...sensorData, type: value as SensorType })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              { Object.values(SensorType).map((t) => <SelectItem value={t}>{t}</SelectItem>) }
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sensor-value">Value</Label>
          <Input id="sensor-value" placeholder="Enter sensor value" onChange={(value) => setSensorData({ ...sensorData, value: Number(value.target.value) })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sensor-unit">Unit</Label>
          <Select
            disabled={!sensorData?.type}
            onValueChange={(value) => setSensorData({ ...sensorData, unit: value as PressureUnit | HumidityUnit | LightUnit | TemperatureUnit })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              { buildUnitSelector() }
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sensor-latitude">Latitude</Label>
          <Input id="sensor-latitude" placeholder="Enter sensor latitude" onChange={(value) => setSensorData({ ...sensorData, latitude: Number(value.target.value) })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sensor-longitude">Longitude</Label>
          <Input id="sensor-longitude" placeholder="Enter sensor longitude" onChange={(value) => setSensorData({ ...sensorData, longitude: Number(value.target.value) })} />
        </div>
        <Button
          variant="default"
          disabled={!sensorData?.externalId || !sensorData.longitude || !sensorData.latitude || !sensorData.value || !sensorData.unit || !sensorData.type}
          onClick={() => props.onSubmit({
            timestamp: (new Date()).toISOString(),
            type: sensorData!.type!,
            unit: sensorData!.unit!,
            latitude: sensorData!.latitude!,
            longitude: sensorData!.longitude!,
            value: sensorData!.value!,
            externalId: sensorData!.externalId!,
          })}
        >Submit</Button>
      </PopoverContent>
    </Popover>
  )
}
