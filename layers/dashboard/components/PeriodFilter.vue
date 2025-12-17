<script setup lang="ts">
import { PERIOD_OPTIONS, type PeriodFilter } from '@/layers/dashboard/types/filters'

const { period, setPeriod } = useUrlFilters()

function handleChange(value: string) {
  setPeriod(value as PeriodFilter)
}

watch(() => period.value, () => handleChange(period.value))
</script>

<template>
  <div class="flex items-center gap-3">
    <UiSelect
      id="period-filter"
      v-model="period"
      :options="PERIOD_OPTIONS"
    />
  </div>
</template>
