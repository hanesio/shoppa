<template>
  <div
    class="group flex cursor-pointer items-center justify-between gap-4 rounded-sm bg-gray-100 px-4 py-2 transition active:scale-99"
  >
    <span class="text-gray-400 line-through">{{ name }}</span>

    <IconCheck class="h-8 w-8 text-indigo-200" />
  </div>
</template>

<script setup lang="ts">
import IconCheck from './icons/IconCheck.vue'

const props = defineProps<{
  name: string
}>()
</script>
<style scoped></style>
