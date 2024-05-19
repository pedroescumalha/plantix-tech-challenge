import React from 'react'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from './cn/table'

type SensorDataTableProps = {
  data: Array<{
    type: string;
    value: string;
    timestamp: string;
  }>
}

export default function SensorDataTable(props: SensorDataTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sensor Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Temperature Sensor</TableCell>
            <TableCell>25.3 °C</TableCell>
            <TableCell>2023-05-19 12:34:56</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Humidity Sensor</TableCell>
            <TableCell>65%</TableCell>
            <TableCell>2023-05-19 12:35:01</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Motion Sensor</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>2023-05-19 12:35:10</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Light Sensor</TableCell>
            <TableCell>500 lux</TableCell>
            <TableCell>2023-05-19 12:35:15</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pressure Sensor</TableCell>
            <TableCell>1020 hPa</TableCell>
            <TableCell>2023-05-19 12:35:20</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
