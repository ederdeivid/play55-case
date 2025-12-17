<script setup lang="ts">
interface Props {
  rows?: number
  columns?: number
}

withDefaults(defineProps<Props>(), {
  rows: 5,
  columns: 5,
})
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-slate-200">
          <th
            v-for="col in columns"
            :key="col"
            class="px-4 py-3 bg-slate-50/50"
          >
            <UiSkeleton width="60%" height="0.875rem" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row"
          class="border-b border-slate-100"
        >
          <td
            v-for="col in columns"
            :key="col"
            class="px-4 py-4"
          >
            <UiSkeleton
              :width="col === 1 ? '80%' : '60%'"
              height="1rem"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
