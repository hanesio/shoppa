<template>
  <div
    class="group flex cursor-pointer items-center justify-between gap-4 rounded-sm bg-gray-100 px-4 transition active:scale-99"
  >
    <span @click="$emit('show-details')" class="w-full py-2 text-gray-400 line-through">{{
      name
    }}</span>

    <IconCheck @click="$emit('put-back')" class="h-8 w-8 text-indigo-200" />
  </div>
</template>

<script setup lang="ts">
import type { ShoppingListItem } from '@/types'
import IconCheck from './icons/IconCheck.vue'

const props = defineProps<{
  name: string
}>()

const emit = defineEmits<{
  (e: 'put-back'): void
  (e: 'show-details'): void
}>()
</script>
<style scoped></style>
