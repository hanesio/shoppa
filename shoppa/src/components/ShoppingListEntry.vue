<template>
  <div
    class="flex cursor-pointer items-center justify-between bg-gray-100 px-8 py-4 text-lg hover:bg-lime-200"
  >
    <div class="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500">H</div>
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
