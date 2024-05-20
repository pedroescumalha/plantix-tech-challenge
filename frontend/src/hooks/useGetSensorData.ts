import { useQuery } from '@tanstack/react-query'
import { getSensorData } from '../services/sensorsDataService'

export function useGetSensorData(page: number, take: number) {
  const queryKey = ['sensorData', page, take]

  return {
    query: useQuery({
      queryKey,
      queryFn: () => getSensorData({ skip: page * take, take }),
    }),
    key: queryKey,
  }
}

