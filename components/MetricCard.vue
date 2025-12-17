<script setup lang="ts">
import type { MetricTrend } from '~/layers/dashboard/types'
import { ICON_PATHS, type IconName } from './icons/constants'

interface Props {
  label?: string
  value?: string
  trend?: MetricTrend
  changeLabel?: string
  icon?: IconName
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  value: '',
  trend: 'neutral',
  changeLabel: '',
  icon: 'chart-bar'
})

const trendColorsMap = new Map<string, string>([
  ['up', 'text-emerald-600 bg-emerald-50'],
  ['down', 'text-red-600 bg-red-50'],
])

const trendColors = computed(() => {
  return trendColorsMap.get(props.trend) ?? 'text-slate-600 bg-slate-50'
})

const trendIcon = computed(() => {
  if (props.trend === 'up') return ICON_PATHS['arrow-up']
  if (props.trend === 'down') return ICON_PATHS['arrow-down']
  return null
})
</script>

<template>
  <UiCard class="relative overflow-hidden">
    <div class="flex items-start justify-between">
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-slate-500 mb-1">
          {{ props.label }}
        </p>

        <p class="text-2xl font-bold text-slate-900 tabular-nums">
          {{ props.value }}
        </p>

        <div class="mt-2 flex items-center gap-1.5">
          <span
            :class="[
              'inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium',
              trendColors
            ]"
          >
            <svg
              v-if="trendIcon"
              class="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" :d="trendIcon" />
            </svg>
            {{ props.changeLabel }}
          </span>

          <span class="text-xs text-slate-400">
            vs período anterior
          </span>
        </div>
      </div>

      <div class="shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
        <svg
          class="w-6 h-6 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          :aria-label="label"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            :d="ICON_PATHS[icon]"
          />
        </svg>
      </div>
    </div>
  </UiCard>
</template>
