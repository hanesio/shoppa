<template>
  <button
    class="flex cursor-pointer items-center justify-center rounded-full px-2 transition-colors duration-200 ease-in-out"
    :class="[
      selected
        ? 'border-3 font-semibold' + ' ' + color.bg + ' ' + color.border
        : 'border font-normal',
      color.border,
      color.text,
    ]"
  >
    {{ name }}
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
