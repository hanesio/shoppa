<template>
  <div
    class="relative flex cursor-pointer items-center justify-between gap-4 rounded-sm bg-gray-100 px-4 py-2 transition hover:bg-gray-200 active:scale-98"
  >
    <div
      class="absolute left-0 my-2 h-4/5 w-2 rounded-l-sm rounded-r-xl"
      :class="colorClass.bg"
    ></div>
    <span :class="colorClass.text">{{ name }}</span>
    <button
      @click="$emit('purchase')"
      class="group flex h-7 w-7 items-center justify-center rounded-full border-3 border-indigo-300"
    >
      <div class="h-1 w-1 rounded-full bg-indigo-300 opacity-0 group-hover:opacity-100"></div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { colorMap } from '@/utils'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  category: string
}>()

const emit = defineEmits<{
  (e: 'purchase'): void
}>()

const colorClass = computed(
  () =>
    colorMap.get(props.category) || {
      text: 'text-gray-500',
      bg: 'bg-gray-100',
      border: 'border-gray-300',
      hover: 'hover:bg-gray-200',
    },
)
</script>
<style scoped></style>
