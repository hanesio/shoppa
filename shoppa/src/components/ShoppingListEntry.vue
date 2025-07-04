<template>
  <div
    class="flex cursor-pointer items-center justify-between px-8 py-4 text-lg hover:bg-indigo-200"
  >
    <p>{{ name }}</p>
    <p>{{ itemCount }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  itemCount: number
}>()
</script>
<style scoped></style>
