<script setup lang="ts">
import type { ChartData } from '@/layers/dashboard/types'

interface Props {
  data: ChartData
}

const props = defineProps<Props>()

const { formatNumber, formatDateShort } = useFormatters()
</script>

<template>
  <LineChart
    :label="props.data.label"
    :data="props.data.data"
    :color="props.data.color"
    :format-value="formatNumber"
    :format-date="formatDateShort"
  />
</template>
