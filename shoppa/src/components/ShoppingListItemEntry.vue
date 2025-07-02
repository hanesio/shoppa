<template>
  <div
    class="group flex cursor-pointer items-center justify-between gap-4 rounded-sm px-4 py-2 transition active:scale-99"
    :class="colorClass.bg"
  >
    <span :class="colorClass.text">{{ name }}</span>
    <div
      class="flex h-7 w-7 items-center justify-center rounded-full border-3"
      :class="colorClass.border"
    >
      <div class="h-1 w-1 rounded-full bg-blue-300 opacity-0 group-hover:opacity-100"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  category: string
}>()

import { colorMap } from '@/utils'
const colorClass = colorMap.get(props.category) || {
  text: 'text-gray-500',
  bg: 'bg-gray-100',
  border: 'border-gray-300',
  hover: 'hover:bg-gray-200',
}
</script>
<style scoped></style>
