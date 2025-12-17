<script setup lang="ts">
</script>

<template>
  <UiCard>
    <div class="flex items-start justify-between">
      <div class="flex-1 space-y-3">
        <UiSkeleton width="40%" height="0.875rem" />
        <UiSkeleton width="60%" height="2rem" />
        <div class="flex items-center gap-2">
          <UiSkeleton width="4rem" height="1.25rem" />
          <UiSkeleton width="5rem" height="0.75rem" />
        </div>
      </div>
      <UiSkeleton width="3rem" height="3rem" class="rounded-xl" />
    </div>
  </UiCard>
</template>
