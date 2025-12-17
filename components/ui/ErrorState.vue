<script setup lang="ts">
interface Props {
  title?: string
  message?: string
  showRetry?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Ocorreu um erro',
  message: 'Não foi possível carregar os dados. Tente novamente.',
  showRetry: true,
})

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-12 px-4 text-center"
    role="alert"
    aria-live="assertive"
  >
    <div class="w-16 h-16 mb-4 rounded-full bg-red-50 flex items-center justify-center">
      <IconsError />
    </div>

    <h3 class="text-lg font-semibold text-slate-900 mb-1">
      {{ props.title }}
    </h3>

    <p class="text-sm text-slate-500 max-w-sm mb-4">
      {{ props.message }}
    </p>

    <button
      v-if="props.showRetry"
      type="button"
      class="
        inline-flex items-center gap-2
        px-4 py-2 text-sm font-medium
        text-blue-600 bg-blue-50 rounded-lg
        hover:bg-blue-100
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        transition-colors duration-200
      "
      @click="emit('retry')"
    >
     <IconsRetry />
      Tentar novamente
    </button>
  </div>
</template>
