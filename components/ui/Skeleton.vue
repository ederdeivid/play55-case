<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  circle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '1rem',
  circle: false,
})
</script>

<template>
  <div
    :class="[
      'animate-pulse bg-slate-200',
      props.circle ? 'rounded-full' : 'rounded-md'
    ]"
    :style="{
      width: props.width,
      height: props.height,
      aspectRatio: props.circle ? '1 / 1' : undefined,
    }"
    role="status"
    aria-label="Carregando..."
  />
</template>
