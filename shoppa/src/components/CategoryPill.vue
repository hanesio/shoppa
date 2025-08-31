<template>
  <button
    class="flex h-4 w-full cursor-pointer items-center justify-center rounded-full px-1 py-0.5 leading-4 transition-colors duration-200 ease-in-out"
    :class="[
      selected
        ? 'font-semibold' + ' ' + color.bg + ' ' + color.border + ' ' + color.text
        : 'border-transparent bg-gray-100 font-normal text-gray-500',
      size,
    ]"
  >
    <p class="w-max">
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
      return 'text-xs  py-2  max-w-max'
    case 'md':
      return 'text-sm  py-3  max-w-max'
    case 'lg':
      return 'text-md  py-4 '
    default:
      return 'text-sm  py-2  max-w-max'
  }
})
</script>
<style scoped></style>
