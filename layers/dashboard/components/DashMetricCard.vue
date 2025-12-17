<script setup lang="ts">
import type { Metric } from '../types'
import { useFormatters } from '../../../composables/useFormatters'
import { calculatePercentageChange } from '@/domain/metrics/calculator'
import MetricCard from '@/components/MetricCard.vue'
import type { IconName } from '@/components/icons/constants'

interface Props {
  metric?: Metric
}

const props = withDefaults(defineProps<Props>(), {
  metric: () => ({
    id: '',
    label: 'Métrica',
    value: 0,
    previousValue: 0,
    format: 'number',
    trend: 'neutral',
    icon: 'chart-bar'
  })
})

const { formatMetricValue } = useFormatters()

const formattedValue = computed(() =>
  formatMetricValue(props.metric.value, props.metric.format)
)

const percentageChange = computed(() =>
  calculatePercentageChange(props.metric.value, props.metric.previousValue)
)

const changeLabel = computed(() => {
  const sign = percentageChange.value >= 0 ? '+' : ''
  return `${sign}${percentageChange.value.toFixed(1)}%`
})
</script>

<template>
  <MetricCard
    :label="metric.label"
    :value="formattedValue"
    :trend="metric.trend"
    :change-label="changeLabel"
    :icon="(metric.icon as IconName)"
  />
</template>
