import { USAGE_MODELS, USAGE_TYPES } from './constants'

export type UsageData = {
  type: string
  model: string
  created_at: string
  usage_input: number
  usage_output: number
  total_cost: number
}

export type CostsData = {
  model: string
  input: number
  output: number
}

export type UsageType = (typeof USAGE_TYPES)[number]
export type UsageModel = (typeof USAGE_MODELS)[number]
