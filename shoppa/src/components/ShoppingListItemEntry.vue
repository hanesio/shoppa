<template>
  <div
    class="relative flex cursor-pointer items-center justify-between gap-4 rounded-sm bg-gray-100 px-4 transition hover:bg-gray-200 active:scale-98"
  >
    <div
      class="absolute left-0 my-2 h-4/5 w-2 rounded-l-sm rounded-r-xl"
      :class="colorClass.bg"
    ></div>
    <span @click="$emit('showDetails')" class="w-full py-2 hyphens-auto" :class="colorClass.text">{{
      name
    }}</span>
    <button
      @click="$emit('purchase')"
      class="group flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-gray-300"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { type ColouredCategory } from '@/stores/categoryStore'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    category?: ColouredCategory
  }>(),
  {
    category: () => ({
      name: 'Sonstiges',
      order: 0,
      color: {
        text: 'text-gray-500',
        bg: 'bg-gray-100',
        border: 'border-gray-300',
        hover: 'hover:bg-gray-200',
      },
    }),
  },
)

const emit = defineEmits<{
  (e: 'purchase'): void
  (e: 'showDetails'): void
}>()

const colorClass = computed(
  () =>
    props.category.color || {
      text: 'text-gray-500',
      bg: 'bg-gray-100',
      border: 'border-gray-300',
      hover: 'hover:bg-gray-200',
    },
)
</script>
<style scoped></style>
