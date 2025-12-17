<script setup lang="ts">
interface Props {
  padded?: boolean
  variant?: 'default' | 'outline' | 'ghost'
}

const props = withDefaults(defineProps<Props>(), {
  padded: true,
  variant: 'default',
})
</script>

<template>
  <div
    :class="[
      'rounded-xl transition-all duration-200',
      {
        'bg-white border border-slate-200 shadow-sm': props.variant === 'default',
        'bg-transparent border border-slate-200': props.variant === 'outline',
        'bg-slate-50/50': props.variant === 'ghost',
        'p-6': props.padded,
      }
    ]"
    role="region"
  >
    <slot />
  </div>
</template>
