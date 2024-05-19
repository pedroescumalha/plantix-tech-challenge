import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import SensorDataTable from './components/sensorDataTable'
import SensorDataPopoverForm from './components/sensorDataPopoverForm'
import { createSensorData, getSensorData } from './lib/sensorsDataService'
import { Paginator } from './components/paginator'

export default function App() {
  const take = 50
  const [page, setPage] = React.useState(0)
  const queryClient =  useQueryClient()

  const getSensorDataQuery = useQuery({
    queryKey: ['sensorData', page, take],
    queryFn: () => getSensorData({ skip: page * take, take }),
  })

  const createSensorDataMutation = useMutation({
    mutationFn: createSensorData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sensorData', page, take] })
    }
  })

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sensor Data</h1>
        <SensorDataPopoverForm onSubmit={createSensorDataMutation.mutate} />
      </div>
      <SensorDataTable data={getSensorDataQuery.data?.data || []} />
      <Paginator
        numOfPages={!getSensorDataQuery.data?.total ? 1 : Math.ceil(getSensorDataQuery.data.total / take)}
        onPageClick={async (p) => setPage(p - 1)}
      />
    </div>
  )
}
