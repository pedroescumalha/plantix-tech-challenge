import React from 'react'
import SensorDataTable from './components/sensorDataTable'
import SensorDataPopoverForm from './components/sensorDataPopoverForm'
import { Paginator } from './components/paginator'
import { useGetSensorData } from './hooks/useGetSensorData'
import { useCreateSensorDataMutation } from './hooks/useCreateSensorDataMutation'

export default function App() {
  const [page, setPage] = React.useState(0)
  const take = 5
  const getSensorDataQuery = useGetSensorData(page, take)
  const createSensorDataMutation = useCreateSensorDataMutation(getSensorDataQuery.key)

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sensor Data</h1>
        <SensorDataPopoverForm onSubmit={createSensorDataMutation.mutate} />
      </div>
      <SensorDataTable data={getSensorDataQuery.query.data?.data || []} />
      <Paginator
        numOfPages={!getSensorDataQuery.query.data?.total ? 1 : Math.ceil(getSensorDataQuery.query.data.total / take)}
        onPageClick={async (p) => setPage(p - 1)}
      />
    </div>
  )
}
