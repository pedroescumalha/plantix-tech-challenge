import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSensorData } from '../services/sensorsDataService'

export function useCreateSensorDataMutation(queryToInvalidate?: (string | number)[]) {
  const queryClient =  useQueryClient()

  return useMutation({
    mutationFn: createSensorData,
    onSuccess: () => {
      if (queryToInvalidate) {
        queryClient.invalidateQueries({ queryKey: queryToInvalidate })
      }
    }
  })
}
