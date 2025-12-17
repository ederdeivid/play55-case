<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  type ChartData,
} from 'chart.js'
import { createLineChartOptions, createLineDatasetStyle } from './LineChart/config'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
)

interface DataPoint {
  date: string
  value: number
}

interface Props {
  label: string
  data: DataPoint[]
  color: string
  formatValue: (value: number) => string
  formatDate: (date: string) => string
}

const props = defineProps<Props>()

const chartData = computed<ChartData<'line'>>(() => {
  const style = createLineDatasetStyle(props.color)

  return {
    labels: props.data.map(point => props.formatDate(point.date)),
    datasets: [
      {
        label: props.label,
        data: props.data.map(point => point.value),
        fill: true,
        ...style,
        pointHoverBackgroundColor: props.color,
        pointBackgroundColor: props.color
      },
    ],
  }
})

const chartOptions = computed(() =>
  createLineChartOptions(props.formatValue)
)
</script>

<template>
  <div class="h-full w-full min-h-75">
    <Line
      :data="chartData"
      :options="chartOptions"
      :aria-label="`Gráfico de ${label}`"
      role="img"
    />
  </div>
</template>
