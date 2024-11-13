import { useState, useCallback, useEffect } from 'react'
import { fetchAndParseCSV } from '@/utils'
import { CostsData, UsageData } from '../types'
import { calculateTotalCost } from '../utils/calculateTotalCost'

export const useGetDashboardData = () => {
  const [usageData, setUsageData] = useState<UsageData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const [rawUsagesData, rawCostsData] = await Promise.all([
        fetchAndParseCSV<UsageData>('/usageData/usages.csv'),
        fetchAndParseCSV<CostsData>('/usageData/costs.csv'),
      ])

      const processedUsageData = calculateTotalCost(rawUsagesData, rawCostsData)
      setUsageData(processedUsageData)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to load data.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { usageData, loading, error, requestReload: fetchData }
}
