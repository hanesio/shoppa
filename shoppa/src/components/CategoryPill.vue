<template>
  <button
    class="flex h-4 cursor-pointer items-center justify-center rounded-full px-1 transition-colors duration-200 ease-in-out"
    :class="[
      selected
        ? 'font-semibold' + ' ' + color.bg + ' ' + color.border + ' ' + color.text
        : 'border-transparent bg-gray-100 font-normal text-gray-500',
      size,
    ]"
  >
    <p>
      {{ name }}
    </p>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    name: string
    size?: string
    color: {
      bg: string
      text: string
      border: string
    }
    selected: boolean
  }>(),
  {
    size: () => 'text-sm  py-2 border-3',
  },
)

const size = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-xs  py-2 border-3'
    case 'md':
      return 'text-sm  py-3 border-3'
    case 'lg':
      return 'text-md  py-3 border-6'
    default:
      return 'text-sm  py-2 border-3'
  }
})
</script>
<style scoped></style>
