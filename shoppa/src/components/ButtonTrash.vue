<template>
  <button class="cursor-pointer text-gray-400">
    <IconTrash :class="sizeClass" />
  </button>
</template>

<script setup lang="ts">
import IconTrash from '@/components/icons/IconTrash.vue'

withDefaults(
  defineProps<{
    sizeClass?: string
  }>(),
  {
    sizeClass: 'h-8 w-8',
  },
)
</script>
