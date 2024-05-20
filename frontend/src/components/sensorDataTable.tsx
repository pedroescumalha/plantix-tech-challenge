import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from './cn/table'
import { SensorDataInput } from '../services/sensorsDataService'

type SensorDataTableProps = {
  data: SensorDataInput[]
}

export default function SensorDataTable(props: SensorDataTableProps) {
  const buildTable = () => {
    return props.data.map((d) => {
      return (
        <TableRow>
          <TableCell>{d.externalId}</TableCell>
          <TableCell>{d.type}</TableCell>
          <TableCell>{d.latitude}</TableCell>
          <TableCell>{d.longitude}</TableCell>
          <TableCell>{`${d.value} ${d.unit}`}</TableCell>
          <TableCell>{d.timestamp}</TableCell>
        </TableRow>
      ) 
    })
  }
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Latitude</TableHead>
            <TableHead>Longitude</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buildTable()}
        </TableBody>
      </Table>
    </div>
  )
}
