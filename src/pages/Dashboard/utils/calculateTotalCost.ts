import { CostsData, UsageData } from '@/pages/Dashboard/types'

export const calculateTotalCost = (usages: UsageData[], costs: CostsData[]): UsageData[] => {
  return usages.map((usage) => {
    const cost = costs.find((c) => c.model === usage.model)

    const inputCost = usage.usage_input * (cost?.input || 0)
    const outputCost = usage.usage_output * (cost?.output || 0)
    const total_cost = inputCost + outputCost

    return { ...usage, total_cost }
  })
}
