<script setup lang="ts">
interface Column {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  width?: string
}

interface Props {
  columns: Column[]
  caption?: string
}

withDefaults(defineProps<Props>(), {
  caption: undefined,
})
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <caption v-if="caption" class="sr-only">
        {{ caption }}
      </caption>
      
      <thead>
        <tr class="border-b border-slate-200">
          <th
            v-for="column in columns"
            :key="column.key"
            :class="[
              'px-4 py-3 font-medium text-slate-500 bg-slate-50/50',
              {
                'text-left': column.align === 'left' || !column.align,
                'text-center': column.align === 'center',
                'text-right': column.align === 'right',
              }
            ]"
            :style="column.width ? { width: column.width } : undefined"
            scope="col"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>
