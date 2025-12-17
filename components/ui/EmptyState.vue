<script setup lang="ts">
interface Props {
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Nenhum dado encontrado',
  description: 'Tente ajustar os filtros ou aguarde novos dados.',
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-12 px-4 text-center"
    role="status"
    aria-live="polite"
  >
    <div class="w-16 h-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
      <IconsEmpty />
    </div>
    
    <h3 class="text-lg font-semibold text-slate-900 mb-1">
      {{ props.title }}
    </h3>
    
    <p class="text-sm text-slate-500 max-w-sm">
      {{ props.description }}
    </p>
    
    <slot name="action" />
  </div>
</template>
