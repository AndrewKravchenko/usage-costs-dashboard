import { FC } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { UsageData } from '@/pages/Dashboard/types'
import { convertToISODate } from '@/utils'

import styles from './Chart.module.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type ChartProps = {
  usageData: UsageData[]
}

const chartOptions: ChartOptions<'line'> = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw as number
          return `Total Cost: $${value.toFixed(2)}`
        },
      },
    },
  },
}

export const Chart: FC<ChartProps> = ({ usageData }) => {
  const groupedDataByDate = usageData.reduce(
    (dateCostMap, { created_at, total_cost }) => {
      dateCostMap[created_at] = (dateCostMap[created_at] || 0) + total_cost
      return dateCostMap
    },
    {} as Record<string, number>,
  )
  const sortedDates = Object.keys(groupedDataByDate).sort((a, b) => {
    return new Date(convertToISODate(a)).getTime() - new Date(convertToISODate(b)).getTime()
  })

  const totalCosts = sortedDates.map((date) => groupedDataByDate[date])

  const chartData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Daily Total Cost',
        data: totalCosts,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  }

  return (
    <div className={styles.chartWrapper}>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}
