import React from 'react'
import { Button } from './cn/button'
import { Input } from './cn/input'
import { Label } from './cn/label'
import { Popover, PopoverContent, PopoverTrigger } from './cn/popover'

export default function SensorDataPopoverForm() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default">Add Sensor</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sensor-name">Sensor Name</Label>
          <Input id="sensor-name" placeholder="Enter sensor name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sensor-value">Sensor Value</Label>
          <Input id="sensor-value" placeholder="Enter sensor value" />
        </div>
        <Button variant="default">Submit</Button>
      </PopoverContent>
    </Popover>
  )
}
