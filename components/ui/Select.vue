<script setup lang="ts">
interface Option {
  value: string
  label: string
}

interface Props {
  options: Option[]
  label?: string
  disabled?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  label: undefined,
  id: undefined,
})

const model = defineModel<string>({ required: true, default: '' })

const selectId = computed(() => props.id ?? `select-${Math.random().toString(36).substring(2, 9)}`)
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      v-if="label"
      :for="selectId"
      class="text-sm font-medium text-slate-700"
    >
      {{ label }}
    </label>
    
    <div class="relative">
      <select
        :id="selectId"
        v-model="model"
        :disabled="disabled"
        class="
          w-full appearance-none
          bg-white border border-slate-200 rounded-lg
          px-4 py-2 pr-10
          text-sm text-slate-900
          transition-all duration-200
          hover:border-slate-300
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <IconsArrow />
      </div>
    </div>
  </div>
</template>
