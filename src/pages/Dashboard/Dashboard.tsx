import { FC, useMemo, useState } from 'react'
import { useGetDashboardData } from './hooks'
import { UsageModel, UsageType } from './types'
import { Filters, Chart } from './components'

import styles from './Dashboard.module.css'

export const Dashboard: FC = () => {
  const [selectedType, setSelectedType] = useState<UsageType>('all')
  const [selectedModel, setSelectedModel] = useState<UsageModel>('all')

  const { usageData, loading, error, requestReload } = useGetDashboardData()

  const filteredUsageData = useMemo(() => {
    return usageData.filter((item) => {
      const isTypeMatch = selectedType === 'all' || item.type === selectedType
      const isModelMatch = selectedModel === 'all' || item.model === selectedModel

      return isTypeMatch && isModelMatch
    })
  }, [selectedType, selectedModel, usageData])

  if (loading) {
    return <div className={styles.loader}>Loading...</div>
  }

  if (error) {
    // TODO: Move the error block to a separate reusable ErrorComponent
    return (
      <div className={styles.error}>
        <p>Something went wrong. Please try again.</p>
        <button className={styles.reloadButton} onClick={requestReload}>
          Reload Data
        </button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Filters
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <Chart usageData={filteredUsageData} />
    </div>
  )
}
