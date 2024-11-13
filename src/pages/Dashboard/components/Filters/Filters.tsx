import { FC } from 'react'
import { USAGE_TYPES, USAGE_MODELS } from '@/pages/Dashboard/constants'
import { UsageType, UsageModel } from '@/pages/Dashboard/types'

import styles from './Filters.module.css'

type FiltersProps = {
  selectedType: UsageType
  setSelectedType: (type: UsageType) => void
  selectedModel: UsageModel
  setSelectedModel: (model: UsageModel) => void
}

export const Filters: FC<FiltersProps> = ({ selectedType, setSelectedType, selectedModel, setSelectedModel }) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filterItem}>
        <label>Filter by Type:</label>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value as UsageType)}>
          {USAGE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterItem}>
        <label>Filter by Model:</label>
        <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value as UsageModel)}>
          {USAGE_MODELS.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
