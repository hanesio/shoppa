<template>
  <button
    class="flex h-4 cursor-pointer items-center justify-center rounded-full border-3 px-1 py-2 transition-colors duration-200 ease-in-out"
    :class="[
      selected
        ? 'font-semibold' + ' ' + color.bg + ' ' + color.border
        : 'border-transparent bg-gray-100 font-normal',
      color.border,
      color.text,
    ]"
  >
    <p class="text-sm">
      {{ name }}
    </p>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  name: string
  color: {
    bg: string
    text: string
    border: string
  }
  selected: boolean
}>()
</script>
<style scoped></style>
